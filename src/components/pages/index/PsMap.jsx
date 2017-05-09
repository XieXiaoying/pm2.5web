import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatColor } from '../../../utils/parseService';
const BMap = window.BMap;
class PsMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            rule: null,
            clearLogoHandle: NaN
        };
    }
      _loadMarker() {
          const map = new BMap.Map('location');
          const point = new BMap.Point(116.46914610023, 40.011163206192);
          map.centerAndZoom(point, 15);
          map.enableScrollWheelZoom();
          Object.keys(this.props.data.home.poiAddress).map((item) => {
              const lon = this.props.data.home.poiAddress[item].blon;
              const lat = this.props.data.home.poiAddress[item].blat;
              const index = new BMap.Point(lon, lat);
              let colorIndex = 6;
              if (this.props.data.home.poiDetail[item]) {
                  colorIndex = formatColor(this.props.data.home.poiDetail[item].pics[0]);
              }
              const iconSource = ['green', 'yellow', 'orange', 'red', 'purple', '8E236B', 'black'];
              const myIcon = new BMap.Icon(require('../../../img/' + iconSource[colorIndex] + '.png'), new BMap.Size(30, 50), {
                  offset: new BMap.Size(10, 25),
                  imageOffset: new BMap.Size(0, 0 - index * 25)
              });
              const marker = new BMap.Marker(index, { icon: myIcon });
              map.addOverlay(marker);
              marker.setTitle(this.props.data.home.poiAddress[item].address);
          });
      }
      render() {
          const id = this.props.data.home.poiIds[0];
          if (this.props.data.home.poiDetail[id]) {
              this._loadMarker();
          }
          return (
             <div id="location" className="location" style={{ height: (document.body.clientHeight - 85) / 2 }}></div>
          );
      }
}
function select(state) {
    return {
        data: state
    };
}
// Wrap the component to inject dispatch and state into it.   2016.6.15
export default connect(select)(PsMap);
