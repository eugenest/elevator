import * as React from 'react';
import {connect} from 'react-redux';

import {addFloorToPath, requestElevator} from '../actions/elevator';

export class Elevator extends React.Component {
  render() {
    let floorButtons = [];
    for (let i = Elevator.floorsCount; i >= 1; i--) {
      floorButtons.push(
        <div className="elevator__panel" key={i}>
          <div className={this.props.requests.some((item) => item && item.floor == i && item.isUp) ? "elevator__button elevator__button--lg active" : "elevator__button elevator__button--lg"} onClick={() => this.props.onClickRequest(i, 'up')}>up</div>
          <br />
          <div className={this.props.requests.some((item) => item && item.floor == i && item.isDown) ? "elevator__button elevator__button--lg active" : "elevator__button elevator__button--lg"} onClick={() => this.props.onClickRequest(i, 'down')}>down</div>
        </div>
        );
    }
    return (
      <div className="flex-row align-center justify-center" style={{ height: '100%' }}>
        <div className={this.props.isDoorsOpened ? "elevator elevator--open" : "elevator"}>
          <div className="elevator__people">
            <img src="public/images/hangover.jpg" alt="" />
          </div>
          <div className="elevator__board">{this.props.currentFloor}</div>
        </div>
        <div className="elevator__panel">
          <div className={this.props.path.includes(5) ? "elevator__button active" : "elevator__button"} onClick={() => this.props.onClick(5)}>5</div>
          <br />
          <div className={this.props.path.includes(3) ? "elevator__button active" : "elevator__button"} onClick={() => this.props.onClick(3)}>3</div>
          <div className={this.props.path.includes(4) ? "elevator__button active" : "elevator__button"} onClick={() => this.props.onClick(4)}>4</div>
          <br />
          <div className={this.props.path.includes(1) ? "elevator__button active" : "elevator__button"} onClick={() => this.props.onClick(1)}>1</div>
          <div className={this.props.path.includes(2) ? "elevator__button active" : "elevator__button"} onClick={() => this.props.onClick(2)}>2</div>
        </div>
        <div className="elevator__floors">
          {floorButtons}
        </div>
      </div>
    );
  }
}

Elevator.propTypes = {
  requests: React.PropTypes.array,
  onClickRequest: React.PropTypes.func,
  isDoorsOpened: React.PropTypes.bool,
  path: React.PropTypes.array,
  currentFloor: React.PropTypes.number,
  onClick: React.PropTypes.func,
};

Elevator.floorsCount = 5;

const mapStateToProps = state =>
  ({
    currentFloor: state.elevator.currentFloor,
    isDoorsOpened: state.elevator.isDoorsOpened,
    path: state.elevator.path,
    requests: state.elevator.requests,
  });


const mapDispatchToProps = dispatch =>
  ({
    onClick: (floor) => {
      dispatch(addFloorToPath(floor));
    },
    onClickRequest: (floor, direction) => {
      dispatch(requestElevator(floor, direction));
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(Elevator);
