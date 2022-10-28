import {Button} from "../button/Button";
import style from "./ResultsPanel.module.css";

type PropsType = {
  stake: string
  winning: number
  calcFunc: () => void
  resetFunc: () => void
}

export const ResultsPanel = (props: PropsType) => {
  return (
    <div className={style.resPanel}>
      <Button title={'Calculate'} onButtonClick={props.calcFunc}/>
      <div className={style.resBlock}>
        <div>
          <span>Total Stake</span>
          <p>{`$ ${props.winning !== 0 ? props.stake : '0.00'}`}</p>
        </div>
        <div>
          <span>To Win</span>
          <p>{`$ ${props.winning.toFixed(2)}`}</p>
        </div>
        <div>
          <span>Payout</span>
          <p>{`$ ${props.winning !== 0 ? (+props.stake + props.winning).toFixed(2) : '0.00'}`}</p>
        </div>
      </div>
      <Button title={'Reset'} onButtonClick={props.resetFunc}/>
    </div>
  )
}