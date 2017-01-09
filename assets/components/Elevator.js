import * as React from 'react';
import { connect } from 'react-redux';

import { addFloorToPath } from '../actions/elevator';

export class Elevator extends React.Component {
  render() {
    console.log(this.props.isDoorsOpened)
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
          <div className="elevator__panel">
            <div className="elevator__button elevator__button--lg">up</div>
            <br />
            <div className="elevator__button elevator__button--lg">down</div>
          </div>
          <div className="elevator__panel">
            <div className="elevator__button elevator__button--lg">up</div>
            <br />
            <div className="elevator__button elevator__button--lg">down</div>
          </div>
          <div className="elevator__panel">
            <div className="elevator__button elevator__button--lg">up</div>
            <br />
            <div className="elevator__button elevator__button--lg">down</div>
          </div>
          <div className="elevator__panel">
            <div className="elevator__button elevator__button--lg">up</div>
            <br />
            <div className="elevator__button elevator__button--lg">down</div>
          </div>
          <div className="elevator__panel">
            <div className="elevator__button elevator__button--lg">up</div>
            <br />
            <div className="elevator__button elevator__button--lg">down</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentFloor: state.elevator.currentFloor,
    isDoorsOpened: state.elevator.isDoorsOpened,
    path: state.elevator.path
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (floor) => {
      dispatch(addFloorToPath(floor));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Elevator);

