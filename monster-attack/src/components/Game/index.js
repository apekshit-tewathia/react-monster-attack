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

  updatedHealth(state, key, percentage) {
    const value = state[key] + (percentage / 100.0) * state[key];
    return value > 100 ? 100 : value;
  }

  gameStart() {
    this.setState({ ...this.state, gameStarted: true });
  }

  updateHealth(key, perc) {
    this.setState(
      (state, props) => {
        return {
          ...state,
          [key]: this.updatedHealth(state, key, perc),
        };
      },
      () => {
        this.checkIfGameOver(this.state[key]);
      }
    );
  }

  checkIfGameOver(value) {
    if (value < 80) {
      this.giveUpHandler();
    }
  }

  attackHandler() {
    this.updateHealth("monsterHealth", -this.randomInteger(1, 10));
    this.updateHealth("myHealth", -this.randomInteger(1, 10));
  }

  specialAttackHandler() {
    if (this.state.myHealth > 90) {
      this.updateHealth("monsterHealth", -this.randomInteger(11, 20));
      this.updateHealth("myHealth", -this.randomInteger(1, 10));
    } else {
      alert("Not allowed");
    }
  }

  healHandler() {
    this.updateHealth("myHealth", 10);
    this.updateHealth("myHealth", -this.randomInteger(1, 10));
  }

  giveUpHandler() {
    alert("Game Over");
    this.setState(this.defaultState);
  }

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
