'use strict';
var adminModule = angular.module('adminModule', []);

adminModule.controller('AdminCtrl', ['$scope', '$window', 'adminApiService', 
    function($scope, $window, adminApiService) {
    var socket = io(document.origin);
    socket.on('socketConnect', function(data) {
        if (data != 'success')
            console.error('Problem connecting using websocket!');
    });

    socket.on('postDeleteSuccess', function(postId) {
        // Searching the post in the posts array
        for (var i in $scope.posts) {
            if ($scope.posts[i]._id == postId) {
                // delete the post
                $scope.posts.splice(i, 1);
                $scope.$apply();
                break;
            }
        }
    })
    // Admin can edit posts
    $scope.isDisable = false;

    $scope.closeAndReset = function() {
        $scope.editedPost = {};
    }
    $scope.savePost = function(post) {
        adminApiService.savePost()
        .then(function(res) {
            $scope.getAllPosts();
        }, function (error) {
            console.log(error)
        });
    };
    $scope.getAllPosts = function() {
        adminApiService.getAllPosts().then(function(res) {
            $scope.posts = res.data;
        }, function(err) {
            if (err.status == 401) {
                $window.location.href = '#/login';
            }
            else {
                console.log(err);
            }
        });
    }
    $scope.deletePost = function(post) {
        socket.emit('postDelete', post);
    }

    $scope.generateBarChart = function() {
        adminApiService.getPostsCountByWriter().then(function(res) {
            var data = res.data;
            if (data && data.length) {
                // set the dimensions and margins of the graph
                var margin = { top: 20, right: 20, bottom: 30, left: 40 },
                    width = 400 - margin.left - margin.right,
                    height = 200 - margin.top - margin.bottom;

                var x = d3.scaleBand()
                    .range([0, width])
                    .padding(0.1);
                var y = d3.scaleLinear()
                    .range([height, 0]);

                // append the svg object to the body of the page
                // append a 'group' element to 'svg'
                // moves the 'group' element to the top left margin
                var svg = d3.select("#barChartSection").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

                    // format the data
                    data.forEach(function (d) {
                        d.Count = +d.Count;
                    });

                    // Scale the range of the data in the domains
                    x.domain(data.map(function (d) { return d._id; }));
                    y.domain([0, d3.max(data, function (d) { return d.count; })]);

                    // append the rectangles for the bar chart
                    svg.selectAll(".bar")
                        .data(data)
                        .enter().append("rect")
                        .attr("class", "bar")
                        .attr("x", function (d) { return x(d._id); })
                        .attr("width", x.bandwidth())
                        .attr("y", function (d) { return y(d.count); })
                        .attr("height", function (d) { return height - y(d.count); });

                    // add the x Axis
                    svg.append("g")
                        .attr("transform", "translate(0," + height + ")")
                        .call(d3.axisBottom(x));

                    // add the y Axis
                    svg.append("g")
                        .call(d3.axisLeft(y));
            }
        }, function(err) {
            console.log(err);
        })
    }

    $scope.generatePieChart = function() {
        adminApiService.getPostStats().then(function(res) {
            var data = res.data;
            if (data && data.length) {
                var formattedData = data.map(function (obj) {
                    return {
                        value: obj.counter,
                        label: obj.title
                    }
                });
                var width = 300,
                    height = 300,
                    radius = Math.min(width, height) / 2;

                var color = d3.scaleOrdinal()
                    .range(["#98abc5", "#8a89a6", "#7b6888"]);

                var arc = d3.arc()
                    .outerRadius(radius - 10)
                    .innerRadius(0);

                var labelArc = d3.arc()
                    .outerRadius(radius - 40)
                    .innerRadius(radius - 40);

                var pie = d3.pie()
                    .value(function (d) { return d.value; })(formattedData);

                var svg = d3.select("#postStatsSection").append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                var g = svg.selectAll(".arc")
                    .data(pie)
                    .enter().append("g")
                    .attr("class", "arc");

                g.append("path")
                    .attr("d", arc)
                    .style("fill", function (d) { return color(d.data.label); });

                g.append("text")
                    .attr("transform", function (d) { return "translate(" + labelArc.centroid(d) + ")"; })
                    .attr("dy", ".35em")
                    .text(function (d) { return d.data.label; });

            }
        }, function(err) {
            console.log(err);
        })
    }
    $scope.getAllPosts();
    $scope.generateBarChart();
    $scope.generatePieChart();
}])