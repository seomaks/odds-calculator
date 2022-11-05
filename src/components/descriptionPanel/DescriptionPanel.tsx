import {Ball} from "../ball/Ball";
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
          <p>The betting odds calculator allows you to input your stake & odds
            in American, Decimal, Implied, or Fractional formats to quickly
            calculate the payout for your bets!</p>
        </div>}
      {props.description === 'American odds' &&
        <div>
          <h2>American odds</h2>
          <p>American odds (moneyline odds) are mainly used by American
            bookmakers. American odds are probably the easiest odds format to
            understand, as the odds are displayed using plus (+) and minus (-)
            symbols to indicate the amount you need to bet to win $100, or the
            amount you can win for every 100 dollars wagered.</p>
        </div>
      }
      {props.description === 'Fractional odds' &&
        <div>
          <h2>Fractional odds</h2>
          <p>Fractional odds (aka “British” odds, “U.K.” odds, or “traditional”
            odds) are popular among British and Irish bookies. Fractional odds
            represent the chances of losing versus the chances of winning in
            terms of fractions. They are typically written with a slash (/).</p>
        </div>
      }
      {props.description === 'Decimal odds' &&
        <div>
          <h2>Decimal odds</h2>
          <p>Decimal odds (aka “European” odds, “digital” odds, or “continental”
            odds) are popular in continental Europe, Australia, New Zealand, and
            Canada. Decimal odds are shown as one number, which is the amount a
            winning bet would collect on a $1 bet.</p>
        </div>
      }
      {props.description === 'Implied odds' &&
        <div>
          <h2>Implied odds</h2>
          <p>Implied probability is a conversion of betting odds into a
            percentage. It takes into account the bookmaker margin to express
            the expected probability of an outcome occurring.</p>
        </div>
      }
      <Ball/>
    </div>
  )
}