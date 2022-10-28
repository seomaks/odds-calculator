import style from './Button.module.css'

type PropsType = {
  title: string
  onButtonClick: () => void
}

export const Button = (props: PropsType) => (
  <div className={style.btnGroup}>
    <button className={style.resBtn}
            onClick={props.onButtonClick}
    >
      {props.title}
    </button>
  </div>
)
