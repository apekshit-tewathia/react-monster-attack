import React from "react";
import Button from "components/Button";
import HealthMeter from "components/Game/HealthMeter";
import ActionButtons from "components/Game/ActionButtons";
import History from "components/Game/History";

const healPercentage = 10;
const gameOverValue = 10;
const specialAttackMinimum = 90;
const attackMinPercentage = 1;
const attackMaxPercentage = 10;
const specialAttackMinPercentage = 11;
const specialAttackMaxPercentage = 20;

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

  updatedHealth(currentHealth, percentage) {
    return currentHealth + this.damageDone(currentHealth, percentage);
  }

  damageDone(value, percentage) {
    return Math.round((percentage / 100.0) * value);
  }

  gameStart() {
    this.setState({ ...this.state, gameStarted: true });
  }

  storeState(state, message) {
    // Storing state is not needed, but storing it to implement time traveling at some later point
    this.moves.push({
      state,
      message,
    });
  }

  updateHealth(key, perc, action) {
    this.setState(
      (state, props) => {
        let updatedState = {
          ...state,
          [key]: this.updatedHealth(state[key], perc),
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
    if (value < gameOverValue) {
      this.giveUpHandler();
    }
  }

  attackHandler() {
    this.updateHealth(
      "monsterHealth",
      -this.randomInteger(attackMinPercentage, attackMaxPercentage),
      "attack"
    );
    this.updateHealth(
      "myHealth",
      -this.randomInteger(attackMinPercentage, attackMaxPercentage),
      "attack"
    );
  }

  specialAttackHandler() {
    if (this.state.myHealth > specialAttackMinimum) {
      this.updateHealth(
        "monsterHealth",
        -this.randomInteger(
          specialAttackMinPercentage,
          specialAttackMaxPercentage
        ),
        "special attack"
      );
      this.updateHealth(
        "myHealth",
        -this.randomInteger(attackMinPercentage, attackMaxPercentage),
        "attack"
      );
    } else {
      alert("Not allowed");
    }
  }

  healHandler() {
    this.updateHealth("myHealth", healPercentage, "heal");
    this.updateHealth(
      "myHealth",
      -this.randomInteger(attackMinPercentage, attackMaxPercentage),
      "attack"
    );
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

  historyClickHandler(move) {
    this.setState(move.state);
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
          <History
            moves={this.moves}
            clicked={(move) => {
              this.historyClickHandler(move);
            }}
          />
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
