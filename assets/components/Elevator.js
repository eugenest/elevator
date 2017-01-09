class Elevator extends React.Component {
  render() {
    return (
      <div className="flex-row align-center justify-center" style={{ height: '100%' }}>
        <div className="elevator">
          <div className="elevator__people">
            <img src="public/images/hangover.jpg" alt="" />
          </div>
          <div className="elevator__board">5</div>
        </div>
        <div className="elevator__panel">
          <div className="elevator__button">5</div>
          <br />
          <div className="elevator__button">3</div>
          <div className="elevator__button">4</div>
          <br />
          <div className="elevator__button">1</div>
          <div className="elevator__button">2</div>
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

export default Elevator;
