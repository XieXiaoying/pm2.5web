/**
 * central-click.js
 */
window.d3.svg.BubbleChart.define('central-click', function(options) {
    const self = this;
    self.setup = (function(node) {
        const original = self.setup;
        return function() {
            const fn = original.apply(this, arguments);
            self.event.on('click', function() {
                if (node.selectAll('text.central-click')[0].length === 1) {
                    alert('Hello!\nCentral bubble is clicked.');
                }
            });
            return fn;
        };
    })();
    self.reset = (function(node) {
        const original = self.reset;
        return function() {
            const fn = original.apply(this, arguments);
            node.select('text.central-click').remove();
            return fn;
        };
    })();
    self.moveToCentral = (function(node) {
        const original = self.moveToCentral;
        return function() {
            const fn = original.apply(this, arguments);
            const transition = self.getTransition().centralNode;
            transition.each('end', function() {
                console.log(node);
                node.append('text').classed({ 'central-click': true })
                .attr(options.attr)
                .style(options.style)
                .attr('x', function(d) {return d.cx;})
                .attr('y', function(d) {return d.cy;})
                .text(options.text)
                .style('opacity', 0).transition().duration(self.getOptions().transitDuration / 2).style('opacity', '0.8');
            });
            return fn;
        };
    })();
});
