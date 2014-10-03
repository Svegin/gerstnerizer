/** @jsx React.DOM */

var React = require("react");
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var keymaster = require('keymaster');
window.React = React;
// render top-level react component
var Slider = require("./components/Slider");
var Grid = require("./components/Grid");
var Sketch = require("./components/sketch/Sketch");
var TypeSelector = require('./components/TypeSelector');
var ColorSelector = require('./components/ColorSelector');

var Application = React.createClass({

  mixins: [FluxMixin, StoreWatchMixin("Grid")],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("Grid").getState();
  },

  componentDidMount: function() {
    keymaster('ctrl+z, ⌘+z', this.undo);
    keymaster('ctrl+shift+z, ⌘+⇧+z', this.redo);
  },

  undo: function() {
    console.log('undo');
    this.getFlux().actions.undo();
  },

  redo: function() {
    console.log('redo');
    this.getFlux().actions.redo();
  },

  componentWillUnmount: function() {
    keymaster.unbind('esc', this.onClose);
  },

  render: function() {
    var step = this.state.type === 'hex' ? 2 : 1;
    /* jshint ignore:start */
    return <div className="row" onKeyDown={this.keyDown}>
      <div className="sidebar">
        <h3>Grid</h3>
        <Slider type="columns" min="0" max="40"/>
        <Slider type="rows" min="0" max="40"/>
        <Slider type="size" min="0" max="200"/>
        <h3>Lines</h3>
        <Slider type="strokeWidth" min="1" max="20" unit="px"/>
        <Slider type="opacity" min="0" max="1" unit="" step="0.01"/>
        <ColorSelector />
        <h3>Pattern</h3>
        <TypeSelector />
        <Sketch />
        <dl>
          <dt>alt+click</dt>
          <dd>delete line</dd>
          <dt>⌘+⇧+s</dt>
          <dd>save svg</dd>
        </dl>

        <a href="http://eskimoblood.github.io/gerstnerizer/"> Code on github</a>
      </div>
      <Grid />

    </div>
    /* jshint ignore:end */
  }

});
module.exports = Application;
