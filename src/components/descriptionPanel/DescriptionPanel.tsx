import { Ball } from "../ball/Ball";
import style from "./DescriptionPanel.module.css";

type PropsType = {
  description: string
}

export const DescriptionPanel = (props: PropsType) => {
  return (
    <div className={style.description}>
      {props.description === 'Greetings' &&
        <div>
          <h2>Hey player!</h2>
          <p>The betting odds calculator allows you to input your stake & odds in American, Decimal, Implied, or Fractional formats to quickly calculate the payout for your bets!</p>
        </div>}
      {props.description === 'American odds' &&
        <div>
          <h2>American odds</h2>
          <p>Also known as US odds or moneyline odds, American odds are the
            default betting odds used by American sportsbooks. American odds are
            centered around winning or wagering $100 on a given bet, with odds
            represented by a plus (+) and minus (-) sign to indicate the
            favorite and underdog.</p>
        </div>
      }
      {props.description === 'Fractional odds' &&
        <div>
          <h2>Fractional odds</h2>
          <p>Fractional odds (aka “British” odds, “U.K.” odds, or “traditional”
            odds) are popular among British and Irish bookies. They are
            typically written with a slash (/).</p>
        </div>
      }
      {props.description === 'Decimal odds' &&
        <div>
          <h2>Decimal odds</h2>
          <p>Decimal odds (aka “European” odds, “digital” odds, or “continental”
            odds) are popular in continental Europe, Australia, New Zealand, and
            Canada. These are a bit easier to work with and understand. The
            favorites and underdogs can be spotted instantaneously by looking at
            the numbers.</p>
        </div>
      }
      {props.description === 'Implied odds' &&
        <div>
          <h2>Implied odds</h2>
          <p>Implied probability in sports betting markets is simply a
            conversion of traditional odds into a percentage, but it also takes
            into account the house edge and eliminates it to express the odds as
            the ‘true odds’ of an event occurring.</p>
        </div>
      }
      <Ball/>
    </div>
  )
}