import style from "./Ball.module.css";

export const Ball = () => {
  return (
    <div className={style.ballSection}>
      <div className={style.posX}>
        <div className={style.posY}>
          <div className={style.ball}>
            <div className={style.light}></div>
            <div className={style.ballShape}></div>
          </div>
        </div>
      </div>
    </div>
  )
}