import React from "react";
import Button from "components/Button";
import HealthMeter from "components/Game/HealthMeter";
import ActionButtons from "components/Game/ActionButtons";
import History from "components/Game/History";

class Game extends React.Component {
  constructor() {
    super();
    this.moves = [];
    this.state = {
      gameStarted: false,
      myHealth: 100,
      monsterHealth: 100,
    };
    this.defaultState = this.state;
  }

  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  updatedHealth(key, percentage) {
    return this.state[key] + (percentage / 100.0) * this.state[key];
  }

  gameStart() {
    this.setState({ ...this.state, gameStarted: true });
  }

  updateHealth(key, value) {
    this.setState(
      {
        ...this.state,
        [key]: value,
      },
      () => {
        this.checkIfGameOver(value);
      }
    );
  }

  checkIfGameOver(value) {
    if (value < 80) {
      alert("Game Over");
      this.setState(this.defaultState);
    }
  }

  attackHandler() {
    this.updateHealth(
      "monsterHealth",
      this.updatedHealth("monsterHealth", -this.randomInteger(1, 10))
    );
  }

  specialAttackHandler() {}

  healHandler() {}

  giveUpHandler() {}

  render() {
    let componentToBeRendered = null;
    if (this.state.gameStarted) {
      componentToBeRendered = (
        <>
          <HealthMeter name="You" health={this.state.myHealth} />
          <HealthMeter name="Monster" health={this.state.monsterHealth} />
          <ActionButtons
            attackHandler={() => this.attackHandler()}
            specialAttackHandler={() => this.specialAttackHandler()}
            giveUpHandler={() => this.giveUpHandler()}
            healHandler={() => this.healHandler()}
          />
          <History moves={this.moves} />
        </>
      );
    } else {
      componentToBeRendered = (
        <Button text="Start Game" clicked={() => this.gameStart()} />
      );
    }
    return <>{componentToBeRendered}</>;
  }
}

export default Game;
