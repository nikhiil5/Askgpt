'use strict'

const request = require('request-promise')

module.exports = (apiKey, apiKeyRegion) => {
  class Bard {
    constructor(apiKey, apiKeyRegion) {
      this.region = apiKeyRegion
      this.apiKey = apiKey

      // some constants
      this.baseURL = `https://${this.region}.api.pvp.net/api/lol`
      this.globalBaseURL = 'https://global.api.pvp.net/api/lol'
      this.championmasteryBaseURL = `https://${this.region}.api.pvp.net/championmastery/location`
      this.observerModeBaseURL = `https://${this.region}.api.pvp.net/observer-mode/rest`

      this.apiVersion = {
        'champion': 'v1.2',
        'championmastery': '',
        'current-game': 'v1.0',
        'featured-games': 'v1.0',
        'game': 'v1.3',
        'league': 'v2.5',
        'lol-static-data': 'v1.2',
        'lol-status': 'v1.0',
        'match': 'v2.2',
        'matchlist': 'v2.2',
        'stats': 'v1.3',
        'summoner': 'v1.4',
        'team': 'v2.4'
      }

      this.platformID = {
        'na': 'NA1',
        'tr': 'TR1',
        'eune': 'EUN1',
        'euw': 'EUW1',
        'lan': 'LA1',
        'las': 'LA2',
        'oce': 'OC1',
        'br': 'BR1',
        'ru': 'RU',
        'kr': 'KR'
      }
    }
    // basic helper function to create an API url
    makeAPIRequest(apiName, url, requestRegion, parameters) { // default args pls nodeJS :(
      if (!apiName) { return } // gotta have an api name
      requestRegion = requestRegion || this.region
      url = url.length > 1 ? url.join('/') : url[0]
      parameters = Object.assign({}, parameters, { api_key: this.apiKey }) // null and undefined are ignored, in case parameters is null
      let fullURL

      if (apiName === 'championmastery') {
        fullURL = `${this.championmasteryBaseURL}/${this.platformID[requestRegion]}/${url}`
      } else if (apiName === 'current-game' || apiName === 'featured-games') {
        fullURL = `${this.observerModeBaseURL}/${this.platformID[requestRegion]}/${url}`
      } else if (apiName === 'lol-static-data') {
        fullURL = `${this.globalBaseURL}/lol/static-data/${requestRegion}/${this.apiVersion[apiName]}/${url}`
      } else if (apiName === 'lol-status') {
        fullURL = `http://status.leagueoflegends.com/${url}`
      } else {
        fullURL = `${this.baseURL}/${requestRegion}/${apiName}/${this.apiVersion[apiName]}/${url}`
      }

      console.log(fullURL)

      return request(Object.assign({}, parameters, { uri: fullURL, json: true }))
    }

    // let's iterate over the different APIs
    // champion
    championList() {
      return this.makeAPIRequest('champion', ['champion'])
    }

    championInfo(id) {
      return this.makeAPIRequest('champion', ['champion', id])
    }

    championsFreeList() {
      return this.makeAPIRequest('champion', ['champion'], this.region, { 'freeToPlay': 'true' })
    }

    // championMastery
    playerChampionMasteryList(playerId) {
      return this.makeAPIRequest('championmastery', ['player', playerId, 'champions'])
    }

    playerChampionMastery(playerId, championId) {
      return this.makeAPIRequest('championmastery', ['player', playerId, 'champion', championId])
    }

    playerChampionMasteryScore(playerId) {
      return this.makeAPIRequest('championmastery', ['player', playerId, 'score'])
    }

    playerChampionMasteryTopChampions(playerId, count) { // boy these function names are getting longer
      count = count || 3
      return this.makeAPIRequest('championmastery', ['player', playerId, 'topchampions'], this.region, { count: count })
    }

    // current-game
    playerCurrentGame(playerId) {
      return this.makeAPIRequest('current-game', ['consumer', 'getSpectatorGameInfo', this.platformID[this.region], playerId])
    }

    // featured-games
    featuredGames() {
      return this.makeAPIRequest('featured-games', ['featured'])
    }

    // game
    playerRecentGames(playerId) {
      return this.makeAPIRequest('game', ['by-summoner', playerId, 'recent'])
    }

    // league
    playerLeague(playerId) {
      return this.makeAPIRequest('league', ['by-summoner', playerId])
    }

    playerLeagueEntry(playerId) {
      return this.makeAPIRequest('league', ['by-summoner', playerId, 'entry'])
    }

    teamLeague(teamId) {
      return this.makeAPIRequest('league', ['by-team', teamId])
    }

    teamLeagueEntry(teamId) {
      return this.makeAPIRequest('league', ['by-team', teamId, 'entry'])
    }

    leagueChallenger() {
      return this.makeAPIRequest('league', ['challenger'])
    }

    leagueMaster() {
      return this.makeAPIRequest('league', ['master'])
    }

    // lol-static-data
    championDataAll(dataType) {
      dataType = dataType || 'all'
      return this.makeAPIRequest('lol-static-data', ['champion'], this.region, { champData: dataType })
    }

    championData(champId, dataType) {
      dataType = dataType || 'all'
      return this.makeAPIRequest('lol-static-data', ['champion', champId], this.region, { champData: dataType })
    }

    itemDataAll(dataType) {
      dataType = dataType || 'all'
      return this.makeAPIRequest('lol-static-data', ['item'], this.region, { itemData: dataType })
    }

    itemData(itemId, dataType) {
      dataType = dataType || 'all'
      return this.makeAPIRequest('lol-static-data', ['item', itemId], this.region, { itemData: dataType })
    }

    mapData() {
      return this.makeAPIRequest('lol-static-data', ['map'])
    }

    masteryDataAll(dataType) {
      dataType = dataType || 'all'
      return this.makeAPIRequest('lol-static-data', ['mastery'], this.region, { masteryListData: dataType })
    }

    masteryData(masteryId, dataType) {
      dataType = dataType || 'all'
      return this.makeAPIRequest('lol-static-data', ['mastery', masteryId], this.region, { masteryListData: dataType })
    }

    runeDataAll(dataType) {
      dataType = dataType || 'all'
      return this.makeAPIRequest('lol-static-data', ['rune'], this.region, { runeData: dataType })
    }

    runeData(runeId, dataType) {
      dataType = dataType || 'all'
      return this.makeAPIRequest('lol-static-data', ['rune', runeId], this.region, { runeData: dataType })
    }

    summonerSpellDataAll(dataType) {
      dataType = dataType || 'all'
      return this.makeAPIRequest('lol-static-data', ['summoner-spell'], this.region, { summonerSpellData: dataType })
    }

    summonerSpellData(ssId, dataType) {
      dataType = dataType || 'all'
      return this.makeAPIRequest('lol-static-data', ['summoner-spell', ssId], this.region, { summonerSpellData: dataType })
    }

    // lol-status
    statusAll() {
      return this.makeAPIRequest('lol-status', ['shards'])
    }

    statusRegion(regionId) {
      return this.makeAPIRequest('lol-status', ['shards', regionId])
    }

    // match
    match(matchId) {
      return this.makeAPIRequest('match', [matchId], this.region, { includeTimeline: 'true' })
    }

    // matchlist
    playerRecentMatches(playerId, params) {
      return this.makeAPIRequest('matchlist', ['by-summoner', playerId], this.region, params)
    }

    // stats
    playerRankedStats(playerId, season) {
      season = season || 'SEASON2016'
      return this.makeAPIRequest('stats', ['by-summoner', playerId, 'ranked'], this.region, { season: season })
    }

    playerStats(playerId, season) {
      season = season || 'SEASON2016'
      return this.makeAPIRequest('stats', ['by-summoner', playerId, 'summary'], this.region, { season: season })
    }

    // summoner
    playerByName(playerName) {
      return this.makeAPIRequest('summoner', ['by-name', playerName])
    }

    player(playerId) {
      return this.makeAPIRequest('summoner', [playerId])
    }

    playerMasteryPages(playerId) {
      return this.makeAPIRequest('summoner', [playerId, 'masteries'])
    }

    playerName(playerId) {
      return this.makeAPIRequest('summoner', [playerId, 'name'])
    }

    playerRunePages(playerId) {
      return this.makeAPIRequest('summoner', [playerId, 'runes'])
    }

    // team
    playerTeams(playerId) {
      return this.makeAPIRequest('team', ['by-summoner', playerId])
    }

    team(teamId) {
      return this.makeAPIRequest('team', [teamId])
    }
  }

  return new Bard(apiKey, apiKeyRegion)
}
