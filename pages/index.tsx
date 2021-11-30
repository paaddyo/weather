import type { NextPage } from 'next'
import React, { useState } from 'react'
import styled from 'styled-components'
import { WeatherData } from '../types'
import { api, getBackground } from '../util'

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [weather, setWeather] = useState<WeatherData | null>(null)

  const search = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetch(`${api.base}weather?q=${searchTerm}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setSearchTerm('')
          setWeather(result)
          console.log(result)
        })
    }
  }

  const today: Date = new Date()

  return (
    <Container temperature={weather?.main.temp}>
      <Header>Weather</Header>
      <SearchBar
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder='Search...'
        value={searchTerm}
        onKeyPress={(e) => search(e)}
      />
      {weather &&
        (weather.cod === '404' ? (
          <div>{weather.message}</div>
        ) : (
          <>
            <Location>
              {weather.name}, {weather.sys.country}
            </Location>
            <DateText>{`${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`}</DateText>
            <TemperatureBox>
              <span>{weather.main.temp}°C</span>
            </TemperatureBox>
            <WeatherDescription>
              {weather.weather[0].description}
            </WeatherDescription>
          </>
        ))}
    </Container>
  )
}

export default Home

const Header = styled.h1`
  line-height: 1.15;
  font-size: 4rem;
  margin-top: 50px;
  font-family: 'montseratt', sans-serif;
`

interface ContainerProps {
  temperature?: number
}

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-size: cover;
  transition: 0.4 ease-out;
  background-position: bottom;
  min-height: 100vh;
  margin: 0px;
  background-image: ${({ temperature }) =>
    `url(${getBackground(temperature)}.png)`};
`

const TemperatureBox = styled.div`
  padding: 15px 25px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  margin: 50px 0;
  font-size: 102px;
  color: #fff;
  font-family: 'montseratt', sans-serif;
  text-shadow: 3px 6px rgba(50, 50, 70, 0.5);
  font-weight: 900;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.2);
`
const Location = styled.span`
  color: #fff;
  font-family: 'montseratt', sans-serif;
  font-size: 32px;
  font-weight: 500;
  text-shadow: 3px 3px rgba(50, 50, 70, 0.5);
`

const DateText = styled.span`
  color: #fff;
  font-family: 'montseratt', sans-serif;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
`

const WeatherDescription = styled.p`
  color: #fff;
  font-size: 48px;
  text-shadow: 3px 6px rgba(50, 50, 70, 0.5);
  font-family: 'montseratt', sans-serif;
  font-weight: 700;
  text-transform: capitalize;
`

const SearchBar = styled.input`
  border-radius: 3rem;
  padding: 1rem;
  width: 300px;
  font-size: 2rem;
  font-family: 'montseratt', sans-serif;
  margin-bottom: 50px;
`
