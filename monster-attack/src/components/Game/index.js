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
    return state[key] + this.damageDone(state[key], percentage);
  }

  damageDone(value, percentage) {
    return (percentage / 100.0) * value;
  }

  gameStart() {
    this.setState({ ...this.state, gameStarted: true });
  }

  storeState(state, message) {
    this.moves.push({
      state,
      message,
    });
    console.log(this.moves);
  }

  updateHealth(key, perc, action) {
    this.setState(
      (state, props) => {
        let updatedState = {
          ...state,
          [key]: this.updatedHealth(state, key, perc),
        };
        // To discuss - Can this be done somewhere else?
        const message = this.actionMessage(
          key,
          Math.abs(this.damageDone(state[key], perc)),
          action
        );
        this.storeState(updatedState, message);
        return updatedState;
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
    this.updateHealth("monsterHealth", -this.randomInteger(1, 10), "attack");
    this.updateHealth("myHealth", -this.randomInteger(1, 10), "attack");
  }

  specialAttackHandler() {
    if (this.state.myHealth > 90) {
      this.updateHealth(
        "monsterHealth",
        -this.randomInteger(11, 20),
        "special attack"
      );
      this.updateHealth("myHealth", -this.randomInteger(1, 10), "attack");
    } else {
      alert("Not allowed");
    }
  }

  healHandler() {
    this.updateHealth("myHealth", 10, "heal");
    this.updateHealth("myHealth", -this.randomInteger(1, 10), "attack");
  }

  actionMessage(turn, damageDone, action) {
    if (action === "attack") {
      if (turn === "monsterHealth") {
        return `Player hits monster for ${damageDone}`;
      } else if (turn === "myHealth") {
        return `Monster hits player for ${damageDone}`;
      }
    } else if (action === "special attack") {
      if (turn === "monsterHealth") {
        return `Player hits monster hard for ${damageDone}`;
      } else if (turn === "myHealth") {
        return `Monster hits player hard for ${damageDone}`;
      }
    } else if (action === "heal") {
      if (turn === "monsterHealth") {
        return `Monster heals for ${damageDone}`;
      } else if (turn === "myHealth") {
        return `Player heals for ${damageDone}`;
      }
    }
  }

  giveUpHandler() {
    alert("Game Over");
    this.setState(this.defaultState);
    this.moves = [];
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
