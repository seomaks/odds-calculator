import React, {ChangeEvent, useState} from 'react';
import style from './App.module.css';
import {OddsConverter} from "./components/oddsConverter/OddsConverter";
import {ResultsPanel} from "./components/resultsPanel/ResultsPanel";
import {DescriptionPanel} from "./components/descriptionPanel/DescriptionPanel";

function App() {

  const [stake, setStake] = useState<string>('100')
  const [americanOdds, setAmericanOdds] = useState<string>('')
  const [decimalOdds, setDecimalOdds] = useState<string>('')
  const [fractionalOdds, setFractionalOdds] = useState<string>('')
  const [impliedOdds, setImpliedOdds] = useState<string>('')
  const [winning, setWinning] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)
  const [description, setDescription] = useState<string>('Greetings')

  const changeStake = (e: ChangeEvent<HTMLInputElement>) => {
    setStake(e.currentTarget.value)
    setWinning(0)
    if (!e.currentTarget.value.match(/^[-]?[\d]*[.]?[\d.]+$/)) {
      setError('Not valid odds')
    } else {
      setError(null)
    }
  }

  const getFraction = (decimal: number) => {
    let denominator;
    for (denominator = 1; (decimal * denominator) % 1 !== 0; denominator++) ;
    return {numerator: decimal * denominator, denominator: denominator};
  }

  const changeAmericanOdds = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setAmericanOdds(value)
    setDecimalOdds('')
    setFractionalOdds('')
    setImpliedOdds('')
    setDescription('American odds')
    if (!value.match(/^[-]?[\d]*[.]?[\d.]+$/)) {
      setError('Not valid odds')
    } else if ((Math.sign(+value) === 1 || Math.sign(+value) === 0) && +value < 100) {
      setError('American odds must be greater than 100')
    } else if (Math.sign(+value) === -1 && +value > -100) {
      setError('American odds must be less than -100')
    } else {
      setError(null)
      if (value.length >= 3 && value.match(/^[-\d.]+$/)) {
        if (Math.sign(+value) === 1) {
          let fractionNumerator = getFraction(+value / 100).numerator
          let fractionDenominator = getFraction(+value / 100).denominator
          setFractionalOdds(fractionNumerator + '/' + fractionDenominator)
          setDecimalOdds((1 + (+value / 100)).toFixed(2))
          setImpliedOdds((100 / (+value + 100) * 100).toFixed(2))
        }
        if (Math.sign(+value) === -1) {
          let fractionNumerator = getFraction(-100 / +value).numerator
          let fractionDenominator = getFraction(-100 / +value).denominator
          setFractionalOdds(fractionNumerator + '/' + fractionDenominator)
          setDecimalOdds((1 - (100 / +value)).toString())
          setImpliedOdds((Math.abs(+value) / (Math.abs(+value) + 100) * 100).toFixed(2))
        }
      }
    }
  }

  const changeDecimalOdds = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setDecimalOdds(value)
    setAmericanOdds('')
    setFractionalOdds('')
    setImpliedOdds('')
    setDescription('Decimal odds')
    if (+value <= 1) {
      setError('American odds must be greater than 1')
    } else if (!value.match(/^[\d.]+$/)) {
      setError('Not valid odds')
    } else {
      setError(null)
      Math.sign(+value) === 1 && (+value > 1) ? setAmericanOdds(((+value - 1) * 100).toString()) : setAmericanOdds((-100 / (+value - 1) * 100).toString())
      let fValue = +(+e.currentTarget.value - 1).toFixed(2)
      let fractionNumerator = getFraction(fValue).numerator
      let fractionDenominator = getFraction(fValue).denominator
      fractionDenominator !== 1 ? setFractionalOdds(fractionNumerator + '/' + fractionDenominator) : setFractionalOdds(fractionNumerator.toString())
      setImpliedOdds(((1 / +value) * 100).toFixed(2))
    }
  }

  const changeFractionalOdds = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setFractionalOdds(value)
    setAmericanOdds('')
    setDecimalOdds('')
    setImpliedOdds('')
    setDescription('Fractional odds')
    if (!value.match(/^[-\d.]+\/+[-\d.]+$/)) {
      setError(`Fractional odds must be at least two digits seperated by a '/'`)
    } else if (value.match(/^[-\d.]+\/+[-]+$/)) {
      setError('Not valid odds')
    } else {
      setError(null)
      let value1 = +value.split('/')[0]
      let value2 = +value.split('/')[1]
      value1 > value2 ? setAmericanOdds((Math.round((value1 / value2) * 100)).toString()) : setAmericanOdds((Math.round(-100 / (value1 / value2))).toString())
      setDecimalOdds(((value1 / value2) + 1).toFixed(2))
      setImpliedOdds((value2 / (value2 + value1) * 100).toFixed(2))
    }
  }

  const changeImpliedOdds = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setImpliedOdds(value)
    setAmericanOdds('')
    setDecimalOdds('')
    setFractionalOdds('')
    setDescription('Implied odds')
    if (+value <= 0 || +value > 100) {
      setError('Implied odds must be a number between 1 and 100')
    } else if (!value.match(/^[-]?[\d]*[.]?[\d.]+$/)) {
      setError('Not valid odds')
    } else {
      setError(null)
      setDecimalOdds((100 / +value).toFixed(3))
      let fraction = getFraction(Number(((100 / +value) - 1).toFixed(3)))
      setFractionalOdds(fraction.numerator + '/' + fraction.denominator)
      if (+value > 50) {
        setAmericanOdds(((+value / (100 - +value)) * 100 * -1).toFixed(2))
      }
      if (+value <= 50) {
        setAmericanOdds((((100 - +value) / +value) * 100).toFixed(2))
      }
    }
  }

  const calcFunc = () => {
    if (americanOdds && Math.sign(+americanOdds) === 1) {
      setWinning((+americanOdds / 100) * +stake)
    }
    if (americanOdds && Math.sign(+americanOdds) === -1) {
      setWinning((100 / Math.abs(+americanOdds)) * +stake)
    }
  }

  const resetFunc = () => {
    setStake('100')
    setImpliedOdds('')
    setAmericanOdds('')
    setDecimalOdds('')
    setFractionalOdds('')
    setWinning(0)
    setError(null)
    setDescription('Greetings')
  }

  return (
    <div>
      <div className={style.calculator}>
        <div className={style.counter}>
          <OddsConverter stake={stake}
                         americanOdds={americanOdds}
                         decimalOdds={decimalOdds}
                         fractionalOdds={fractionalOdds}
                         impliedOdds={impliedOdds}
                         changeStake={changeStake}
                         changeAmericanOdds={changeAmericanOdds}
                         changeDecimalOdds={changeDecimalOdds}
                         changeFractionalOdds={changeFractionalOdds}
                         changeImpliedOdds={changeImpliedOdds}
                         error={error}
          />
          <ResultsPanel stake={stake}
                        winning={winning}
                        calcFunc={calcFunc}
                        resetFunc={resetFunc}/>
        </div>
        <DescriptionPanel description={description}/>
      </div>
    </div>
  );
}

export default App;
