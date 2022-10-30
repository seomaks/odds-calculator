import style from "./OddsConverter.module.css";
import {ControlledInput} from "../controlledInput/ControlledInput";
import {ChangeEvent} from "react";

type PropsType = {
  stake: string
  americanOdds: string
  decimalOdds: string
  fractionalOdds: string
  impliedOdds: string
  changeStake: (e: ChangeEvent<HTMLInputElement>) => void
  changeAmericanOdds: (e: ChangeEvent<HTMLInputElement>) => void
  changeDecimalOdds: (e: ChangeEvent<HTMLInputElement>) => void
  changeFractionalOdds: (e: ChangeEvent<HTMLInputElement>) => void
  changeImpliedOdds: (e: ChangeEvent<HTMLInputElement>) => void
  error: string | null
}

export const OddsConverter = (props: PropsType) => {
  return (
    <div className={style.wrapper}>
      <h1>Odds calculator</h1>
      <form name="form">
        <div className={style.row}>
          <div className={style.firstColumn}>
            <h2>Enter stake</h2>
            <ControlledInput value={props.stake}
                             onInputValueChange={props.changeStake}/>
          </div>
        </div>
        <div className={style.row}>
          <div className={style.firstColumn}>
            <h2>American Odds</h2>
            <ControlledInput value={props.americanOdds} maxLength={7}
                             onInputValueChange={props.changeAmericanOdds}/>
          </div>
          <div className={style.secondColumn}>
            <h2>Decimal Odds</h2>
            <ControlledInput value={props.decimalOdds}
                             onInputValueChange={props.changeDecimalOdds}/>
          </div>
        </div>
        <div className={style.row}>
          <div className={style.firstColumn}>
            <h2>Fractional Odds</h2>
            <ControlledInput value={props.fractionalOdds}
                             onInputValueChange={props.changeFractionalOdds}/>
          </div>
          <div className={style.secondColumn}>
            <h2>Implied Odds</h2>
            <ControlledInput value={props.impliedOdds} maxLength={6}
                             onInputValueChange={props.changeImpliedOdds}/>
          </div>
        </div>
        {props.error && <div className={style.error}>{props.error}</div>}
      </form>
    </div>
  )
}