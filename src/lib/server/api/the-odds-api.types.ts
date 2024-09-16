export interface paths {
	'/v4/sports': {
		parameters: {
			path?: never;
			query?: never;
			header?: never;
			cookie?: never;
		};

		options?: never;
		delete?: never;
		trace?: never;
		patch?: never;
		head?: never;
		post?: never;
		put?: never;

		get: {
			parameters: {
				query: {
					/**
					 * @description Get an API key at https://the-odds-api.com/#get-access
					 * @example abcdefg1234567890
					 */
					apiKey: string;
					/**
					 * @description When excluded, only recently updated (in-season) sports appear. Include this paramter to see all available sports
					 * @example true
					 */
					all?: boolean;
				};
				header?: never;
				path?: never;
				cookie?: never;
			};
			requestBody?: never;
			responses: {
				/** @description Returns a list of available sports. Use the sport "key" in the /odds request */
				200: {
					headers: {
						/** @description The number of requests remaining until the quota resets */
						'x-requests-remaining'?: number;
						/** @description The number of requests used since the last quota reset */
						'x-requests-used'?: number;
						/** @description The usage cost of the last API call */
						'x-requests-last'?: number;
						[name: string]: unknown;
					};
					content: {
						'application/json': {
							key?: components['schemas']['SportKey'];
							/**
							 * @description Indicates if the sport is in season
							 * @example true
							 */
							active?: boolean;
							/**
							 * @description A broader grouping
							 * @example American Football
							 */
							group?: string;
							/**
							 * @description A brief description of the sport. Subject to change (for example, if sponsors change)
							 * @example US Football
							 */
							description?: string;
							title?: components['schemas']['SportTitle'];
							/**
							 * @description Indicates if the sport has outrights markets.
							 * @example false
							 */
							has_outrights?: boolean;
						}[];
					};
				};
				/** @description Unauthenticated or unauthorized. The API key might be missing or invalid (unauthenticated), or it might at its usage limit (unauthorized). The repsonse body will contain more info */
				401: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
				/** @description One or more of the query params are invalid. The repsonse body will contain more info */
				422: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
				/** @description The request was throttled because requests are being sent too frequently */
				429: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
				/** @description Internal error */
				500: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
			};
		};
	};
	'/v4/sports/{sport}/odds': {
		parameters: {
			path?: never;
			query?: never;
			header?: never;
			cookie?: never;
		};

		options?: never;
		delete?: never;
		trace?: never;
		patch?: never;
		head?: never;
		post?: never;
		put?: never;

		get: {
			parameters: {
				query: {
					/**
					 * @description Access key (40 characters), see https://the-odds-api.com/#get-access
					 * @example abc123ABC456abc123ABC456abc123ABC456abc1
					 */
					apiKey: string;
					/**
					 * @description Determines which bookmakers appear in the response. Multiple regions can be specified if comma delimited. Each region will count as 1 request against the usage quota for each market. Most use cases will only need to specify one region. For a list of bookmakers by region, see https://the-odds-api.com/sports-odds-data/bookmaker-apis.html
					 * @example us
					 */
					regions: 'uk' | 'us' | 'us2' | 'eu' | 'au';
					/**
					 * @description The odds market to return. Multiple markets can be specified if comma delimited. Defaults to h2h (head to head / moneyline). Outrights are only avaialable for select sports, such as golf.
					 * @example h2h,spreads
					 */
					markets?: 'h2h' | 'spreads' | 'totals' | 'outrights';
					/**
					 * @description Format of returned timestamps. Can be iso (ISO8601) or unix timestamp (seconds since epoch)
					 * @example iso
					 */
					dateFormat?: 'iso' | 'unix';
					/**
					 * @description Format of returned odds
					 * @example decimal
					 */
					oddsFormat?: 'decimal' | 'american';
					/** @description Comma-separated event ids. Filters the response to only return events for the specified ids, provided those events have not expired */
					eventIds?: string;
					/** @description Comma-separated list of bookmakers to be returned. If both `bookmakers` and `regions` are specified, `bookmakers` takes precendence. Bookmakers can be from any region. Every group of 10 bookmakers counts as 1 request. For example for a single market, specifying up to 10 bookmakers is the equivalent of 1 region. Specifying between 11 and 20 bookmakers is the equivalent of 2 regions */
					bookmakers?: string;
					/**
					 * @description Filters the response to show events that commence on and after this parameter. Values are in ISO8601 format
					 * @example 2023-09-09T00:00:00Z
					 */
					commenceTimeFrom?: string;
					/**
					 * @description Filters the response to show events that commence on and before this parameter. Values are in ISO8601 format
					 * @example 2023-09-09T00:00:00Z
					 */
					commenceTimeTo?: string;
				};
				header?: never;
				path: {
					/**
					 * @description sport key for which to return events and odds. This is obtained from the /sports endpoint
					 * @example americanfootball_nfl
					 */
					sport: string;
				};
				cookie?: never;
			};
			requestBody?: never;
			responses: {
				/** @description A list of live and upcoming events for the specified sport, including odds from bookmakers in the specific region for the specified market */
				200: {
					headers: {
						/** @description The number of requests remaining until the quota resets */
						'x-requests-remaining'?: number;
						/** @description The number of requests used since the last quota reset */
						'x-requests-used'?: number;
						/** @description The usage cost of the last API call */
						'x-requests-last'?: number;
						[name: string]: unknown;
					};
					content: {
						'application/json': {
							id?: components['schemas']['MatchId'];
							sport_key?: components['schemas']['SportKey'];
							sport_title?: components['schemas']['SportTitle'];
							commence_time?: components['schemas']['CommenceTime'];
							home_team?: components['schemas']['HomeTeam'];
							away_team?: components['schemas']['AwayTeam'];
							bookmakers?: {
								/**
								 * @description A unique slug (key) of the bookmaker
								 * @example draftkings
								 */
								key?: string;
								/**
								 * @description A formatted title of the bookmaker
								 * @example DraftKings
								 */
								title?: string;
								/**
								 * Format: date-time
								 * @description A timestamp of when the bookmaker's odds were last read. Will be an integer if dateFormat=unix, otherwise it will be a string
								 * @example 2023-10-10T12:10:29Z
								 */
								last_update?: string;
								/** @description The included market depends on the specified 'markets' GET param. NOTE Allow for the addition of new market types in future. */
								markets?: {
									/**
									 * @description The name of the odds market
									 * @example h2h
									 * @enum {string}
									 */
									key?: 'h2h' | 'spreads' | 'totals' | 'outrights';
									/**
									 * Format: date-time
									 * @description A timestamp of when the markets's odds were last read. Will be an integer if dateFormat=unix, otherwise it will be a string. To check recency of odds, we recommend using this field instead of the "last_update" field at the bookmaker level.
									 * @example 2023-10-10T12:10:29Z
									 */
									last_update?: string;
									/** @example [
									 *       {
									 *         "name": "Houston Texans",
									 *         "price": 2.23
									 *       },
									 *       {
									 *         "name": "Kansas City Chiefs",
									 *         "price": 1.45
									 *       }
									 *     ] */
									outcomes?: components['schemas']['Outcome'][];
								}[];
							}[];
						}[];
					};
				};
				/** @description Unauthenticated or unauthorized. The API key might be missing or invalid (unauthenticated), or it might at its usage limit (unauthorized). The repsonse body will contain more info */
				401: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
				/** @description One or more of the query params are invalid. The repsonse body will contain more info */
				422: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
				/** @description Requests are being sent too frequently - the request was throttled */
				429: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
				/** @description Internal error */
				500: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
			};
		};
	};
	'/v4/sports/{sport}/scores': {
		parameters: {
			path?: never;
			query?: never;
			header?: never;
			cookie?: never;
		};

		options?: never;
		delete?: never;
		trace?: never;
		patch?: never;
		head?: never;
		post?: never;
		put?: never;

		get: {
			parameters: {
				query: {
					/** @description Access key (40 characters). Get an API key at https://the-odds-api.com/#get-access */
					apiKey: string;
					/**
					 * @description The number of days in the past from which to return completed events. Valid values are integers from `1` to `3`. If this field is missing, only live and upcoming events are returned.
					 * @example 3
					 */
					daysFrom?: number;
					/**
					 * @description Format of returned timestamps. Can be iso (ISO8601) or unix timestamp (seconds since epoch)
					 * @example iso
					 */
					dateFormat?: 'iso' | 'unix';
					/** @description Comma-separated event ids. Filters the response to only return events for the specified ids, provided those events have not expired */
					eventIds?: string;
				};
				header?: never;
				path: {
					/**
					 * @description sport key for which to return events and odds
					 * @example americanfootball_nfl
					 */
					sport: string;
				};
				cookie?: never;
			};
			requestBody?: never;
			responses: {
				/** @description A list of live and upcoming events for the specified sport, and optionally recently completed events. Scores will be included for live and recently completed events. */
				200: {
					headers: {
						/** @description The number of requests remaining until the quota resets */
						'x-requests-remaining'?: number;
						/** @description The number of requests used since the last quota reset */
						'x-requests-used'?: number;
						/** @description The usage cost of the last API call */
						'x-requests-last'?: number;
						[name: string]: unknown;
					};
					content: {
						'application/json': {
							id?: components['schemas']['MatchId'];
							sport_key?: components['schemas']['SportKey'];
							sport_title?: components['schemas']['SportTitle'];
							commence_time?: components['schemas']['CommenceTime'];
							/** @description true if the event has finished, otherwise false */
							completed?: boolean;
							home_team?: components['schemas']['HomeTeam'];
							away_team?: components['schemas']['AwayTeam'];
							/**
							 * @description A list of teams and their scores. List will be empty if event has not started.
							 * @example [
							 *       {
							 *         "name": "Houston Texans",
							 *         "score": "20"
							 *       },
							 *       {
							 *         "name": "Kansas City Chiefs",
							 *         "score": "34"
							 *       }
							 *     ]
							 */
							scores?: components['schemas']['ScoreModel'][];
							/**
							 * @description ISO8601 datetime of when the scores were last updated. Will be null if event has not started
							 * @example 2023-10-11T23:30:12Z
							 */
							last_update?: string | null;
						}[];
					};
				};
				/** @description Unauthenticated or unauthorized. The API key might be missing or invalid (unauthenticated), or it might at its usage limit (unauthorized). The repsonse body will contain more info */
				401: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
				/** @description One or more of the query params are invalid. The repsonse body will contain more info */
				422: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
				/** @description Requests are being sent too frequently - the request was throttled */
				429: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
				/** @description Internal error */
				500: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
			};
		};
	};
	'/v4/sports/{sport}/events': {
		parameters: {
			path?: never;
			query?: never;
			header?: never;
			cookie?: never;
		};

		options?: never;
		delete?: never;
		trace?: never;
		patch?: never;
		head?: never;
		post?: never;
		put?: never;

		get: {
			parameters: {
				query: {
					/**
					 * @description Access key (40 characters). Get an API key at https://the-odds-api.com/#get-access
					 * @example abc123ABC456abc123ABC456abc123ABC456abc1
					 */
					apiKey: string;
					/**
					 * @description Format of returned timestamps. Can be iso (ISO8601) or unix timestamp (seconds since epoch)
					 * @example iso
					 */
					dateFormat?: 'iso' | 'unix';
					/** @description Comma-separated event ids. Filters the response to only return events for the specified ids, provided those events have not expired */
					eventIds?: string;
					/**
					 * @description Filters the response to show events that commence on and after this parameter. Values are in ISO8601 format
					 * @example 2023-09-09T00:00:00Z
					 */
					commenceTimeFrom?: string;
					/**
					 * @description Filters the response to show events that commence on and before this parameter. Values are in ISO8601 format
					 * @example 2023-09-09T00:00:00Z
					 */
					commenceTimeTo?: string;
				};
				header?: never;
				path: {
					/**
					 * @description sport key for which to return events and odds. This is obtained from the /sports endpoint
					 * @example americanfootball_nfl
					 */
					sport: string;
				};
				cookie?: never;
			};
			requestBody?: never;
			responses: {
				/** @description A list of live and upcoming events for the specified sport, excluding odds */
				200: {
					headers: {
						/** @description The number of requests remaining until the quota resets */
						'x-requests-remaining'?: number;
						/** @description The number of requests used since the last quota reset */
						'x-requests-used'?: number;
						/** @description The usage cost of the last API call */
						'x-requests-last'?: number;
						[name: string]: unknown;
					};
					content: {
						'application/json': {
							id?: components['schemas']['MatchId'];
							sport_key?: components['schemas']['SportKey'];
							sport_title?: components['schemas']['SportTitle'];
							commence_time?: components['schemas']['CommenceTime'];
							home_team?: components['schemas']['HomeTeam'];
							away_team?: components['schemas']['AwayTeam'];
						}[];
					};
				};
				/** @description Unauthenticated or unauthorized. The API key might be missing or invalid (unauthenticated), or it might at its usage limit (unauthorized). The repsonse body will contain more info */
				401: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
				/** @description One or more of the query params are invalid. The repsonse body will contain more info */
				422: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
				/** @description Requests are being sent too frequently - the request was throttled */
				429: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
				/** @description Internal error */
				500: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
			};
		};
	};
	'/v4/sports/{sport}/events/{eventId}/odds': {
		parameters: {
			path?: never;
			query?: never;
			header?: never;
			cookie?: never;
		};

		options?: never;
		delete?: never;
		trace?: never;
		patch?: never;
		head?: never;
		post?: never;
		put?: never;

		get: {
			parameters: {
				query: {
					/**
					 * @description Access key (40 characters). Get an API key at https://the-odds-api.com/#get-access
					 * @example abc123ABC456abc123ABC456abc123ABC456abc1
					 */
					apiKey: string;
					/**
					 * @description Determines which bookmakers appear in the response. Multiple regions can be specified if comma delimited. Each region will count as 1 request against the usage quota for each market. Most use cases will only need to specify one region. See [the full list of bookmakers by region](https://the-odds-api.com/sports-odds-data/bookmaker-apis.html)
					 * @example us
					 */
					regions: 'uk' | 'us' | 'us2' | 'eu' | 'au';
					/**
					 * @description The odds markets to return. Multiple markets can be specified if comma delimited. Defaults to h2h (head to head / moneyline). Outrights only avaialable for select sports. See [the full list of supported market keys](https://the-odds-api.com/sports-odds-data/betting-markets.html)
					 * @example player_pass_tds,alternate_spreads
					 */
					markets?: string;
					/**
					 * @description Format of returned timestamps. Can be iso (ISO8601) or unix timestamp (seconds since epoch)
					 * @example iso
					 */
					dateFormat?: 'iso' | 'unix';
					/**
					 * @description Format of returned odds
					 * @example decimal
					 */
					oddsFormat?: 'decimal' | 'american';
					/** @description Comma-separated list of bookmakers to be returned. If both `bookmakers` and `regions` are specified, `bookmakers` takes precendence. Bookmakers can be from any region. Every group of 10 bookmakers counts as 1 request. For example for a single market, specifying up to 10 bookmakers counts as 1 request. Specifying between 11 and 20 bookmakers counts as 2 requests */
					bookmakers?: string;
				};
				header?: never;
				path: {
					/**
					 * @description sport key for which to return events and odds. This is obtained from the /sports endpoint
					 * @example americanfootball_nfl
					 */
					sport: string;
					/**
					 * @description Event ids can be found in the `id` field in the response of the `/events` endpoint (see `/v4/sports/{sports}/events`). If the event has expired (not receiving updates due to completion or cancellation), a HTTP 404 status code will be returned.
					 * @example 50f069186530f68051f2a978745931b5
					 */
					eventId: string;
				};
				cookie?: never;
			};
			requestBody?: never;
			responses: {
				/** @description The event with the eventId specified in the path parameter. Includes odds from bookmakers in the specified region for the specified markets */
				200: {
					headers: {
						/** @description The number of requests remaining until the quota resets */
						'x-requests-remaining'?: number;
						/** @description The number of requests used since the last quota reset */
						'x-requests-used'?: number;
						/** @description The usage cost of the last API call */
						'x-requests-last'?: number;
						[name: string]: unknown;
					};
					content: {
						'application/json': {
							id?: components['schemas']['MatchId'];
							sport_key?: components['schemas']['SportKey'];
							sport_title?: components['schemas']['SportTitle'];
							commence_time?: components['schemas']['CommenceTime'];
							home_team?: components['schemas']['HomeTeam'];
							away_team?: components['schemas']['AwayTeam'];
							bookmakers?: {
								/**
								 * @description A unique slug (key) of the bookmaker
								 * @example draftkings
								 */
								key?: string;
								/**
								 * @description A formatted title of the bookmaker
								 * @example DraftKings
								 */
								title?: string;
								/** @description The included market depends on the specified 'markets' GET param. */
								markets?: {
									/**
									 * @description The unique key for the odds market
									 * @example alternate_spreads
									 */
									key?: string;
									/**
									 * Format: date-time
									 * @description A timestamp of when the markets's odds were last read. Will be an integer if dateFormat=unix, otherwise it will be a string.
									 * @example 2023-10-10T12:10:29Z
									 */
									last_update?: string;
									/** @example [
									 *       {
									 *         "name": "Houston Texans",
									 *         "price": 5.08,
									 *         "point": -23
									 *       },
									 *       {
									 *         "name": "Houston Texans",
									 *         "price": 4.82,
									 *         "point": -22.5
									 *       },
									 *       {
									 *         "name": "Houston Texans",
									 *         "price": 4.66,
									 *         "point": -22
									 *       },
									 *       {
									 *         "name": "Kansas City Chiefs",
									 *         "price": 1.15,
									 *         "point": 23
									 *       },
									 *       {
									 *         "name": "Kansas City Chiefs",
									 *         "price": 1.17,
									 *         "point": 22.5
									 *       },
									 *       {
									 *         "name": "Kansas City Chiefs",
									 *         "price": 1.17,
									 *         "point": 22
									 *       }
									 *     ] */
									outcomes?: components['schemas']['Outcome'][];
								}[];
							}[];
						};
					};
				};
				/** @description Unauthenticated or unauthorized. The API key might be missing or invalid (unauthenticated), or it might at its usage limit (unauthorized). The repsonse body will contain more info */
				401: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
				/** @description The event id is invalid or the event has expired */
				404: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
				/** @description One or more of the query params are invalid. The repsonse body will contain more info */
				422: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
				/** @description Requests are being sent too frequently - the request was throttled */
				429: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
				/** @description Internal error */
				500: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
			};
		};
	};
	'/v4/historical/sports/{sport}/odds': {
		parameters: {
			path?: never;
			query?: never;
			header?: never;
			cookie?: never;
		};

		options?: never;
		delete?: never;
		trace?: never;
		patch?: never;
		head?: never;
		post?: never;
		put?: never;

		get: {
			parameters: {
				query: {
					/**
					 * @description Access key (40 characters). Get an API key at https://the-odds-api.com/#get-access
					 * @example abc123ABC456abc123ABC456abc123ABC456abc1
					 */
					apiKey: string;
					/**
					 * @description Determines which bookmakers appear in the response. Multiple regions can be specified if comma delimited. Most use cases will only need to specify one region. For a list of bookmakers by region, see https://the-odds-api.com/sports-odds-data/bookmaker-apis.html
					 * @example us
					 */
					regions: 'uk' | 'us' | 'us2' | 'eu' | 'au';
					/**
					 * @description The odds market to return. Multiple markets can be specified if comma delimited. Defaults to h2h (head to head / moneyline). Outrights are only avaialable for select sports, such as golf.
					 * @example h2h,spreads
					 */
					markets?: 'h2h' | 'spreads' | 'totals' | 'outrights';
					/**
					 * @description Format of returned timestamps. Can be iso (ISO8601) or unix timestamp (seconds since epoch)
					 * @example iso
					 */
					dateFormat?: 'iso' | 'unix';
					/**
					 * @description Format of returned odds
					 * @example decimal
					 */
					oddsFormat?: 'decimal' | 'american';
					/** @description Comma-separated event ids. Filters the response to only return events for the specified ids, provided those events have not expired */
					eventIds?: string;
					/** @description Comma-separated list of bookmakers to be returned. If both `bookmakers` and `regions` are specified, `bookmakers` takes precendence. Bookmakers can be from any region. Every group of 10 bookmakers counts as 1 request. For example for a single market, specifying up to 10 bookmakers counts as 1 request. Specifying between 11 and 20 bookmakers counts as 2 requests */
					bookmakers?: string;
					/**
					 * @description The timestamp of the data snapshot to be returned, specified in ISO8601 format. The historical odds API will return the closest snapshot equal to or earlier than the provided date parameter
					 * @example 2023-10-10T12:15:00Z
					 */
					date: string;
				};
				header?: never;
				path: {
					/**
					 * @description sport key for which to return events and odds. This is obtained from the /sports endpoint
					 * @example americanfootball_nfl
					 */
					sport: string;
				};
				cookie?: never;
			};
			requestBody?: never;
			responses: {
				/** @description A list of live and upcoming events and bookmaker odds for the specified sport, from the historical snapshot closest to the specified date */
				200: {
					headers: {
						/** @description The number of requests remaining until the quota resets */
						'x-requests-remaining'?: number;
						/** @description The number of requests used since the last quota reset */
						'x-requests-used'?: number;
						/** @description The usage cost of the last API call */
						'x-requests-last'?: number;
						[name: string]: unknown;
					};
					content: {
						'application/json': {
							/**
							 * @description The timestamp of the snapshot. This will be the closest available timestamp equal to or earlier than the provided date parameter.
							 * @example 2023-10-10T12:10:39Z
							 */
							timestamp?: string;
							/**
							 * @description The preceding available timestamp. This can be used as the date parameter in a new request to move back in time.
							 * @example 2023-10-10T12:05:39Z
							 */
							previous_timestamp?: string;
							/**
							 * @description The next available timestamp. This can be used as the date parameter in a new request to move forward in time.
							 * @example 2023-10-10T12:15:39Z
							 */
							next_timestamp?: string;
							/** @description A list of live and upcoming events at the time of the snapshot */
							data?: {
								id?: components['schemas']['MatchId'];
								sport_key?: components['schemas']['SportKey'];
								sport_title?: components['schemas']['SportTitle'];
								commence_time?: components['schemas']['CommenceTime'];
								home_team?: components['schemas']['HomeTeam'];
								away_team?: components['schemas']['AwayTeam'];
								bookmakers?: {
									/**
									 * @description A unique slug (key) of the bookmaker
									 * @example draftkings
									 */
									key?: string;
									/**
									 * @description A formatted title of the bookmaker
									 * @example DraftKings
									 */
									title?: string;
									/**
									 * Format: date-time
									 * @description A timestamp of when the bookmaker's odds were last read. Will be an integer if dateFormat=unix, otherwise it will be a string
									 * @example 2023-10-10T12:10:29Z
									 */
									last_update?: string;
									/** @description The included market depends on the specified 'markets' GET param. NOTE Allow for the addition of new market types in future. */
									markets?: {
										/**
										 * @description The name of the odds market
										 * @example h2h
										 * @enum {string}
										 */
										key?: 'h2h' | 'spreads' | 'totals' | 'outrights';
										/**
										 * Format: date-time
										 * @description A timestamp of when the markets's odds were last read. Will be an integer if dateFormat=unix, otherwise it will be a string. To check recency of odds, we recommend using this field instead of the "last_update" field at the bookmaker level.
										 * @example 2023-10-10T12:10:29Z
										 */
										last_update?: string;
										/** @example [
										 *       {
										 *         "name": "Houston Texans",
										 *         "price": 2.23
										 *       },
										 *       {
										 *         "name": "Kansas City Chiefs",
										 *         "price": 1.45
										 *       }
										 *     ] */
										outcomes?: components['schemas']['Outcome'][];
									}[];
								}[];
							}[];
						};
					};
				};
				/** @description Unauthenticated or unauthorized. The API key might be missing or invalid (unauthenticated), or it might at its usage limit (unauthorized). The repsonse body will contain more info */
				401: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
				/** @description One or more of the query params are invalid. The repsonse body will contain more info */
				422: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
				/** @description Requests are being sent too frequently - the request was throttled */
				429: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
				/** @description Internal error */
				500: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
			};
		};
	};
	'/v4/historical/sports/{sport}/events': {
		parameters: {
			path?: never;
			query?: never;
			header?: never;
			cookie?: never;
		};

		options?: never;
		delete?: never;
		trace?: never;
		patch?: never;
		head?: never;
		post?: never;
		put?: never;

		get: {
			parameters: {
				query: {
					/**
					 * @description Access key (40 characters). Get an API key at https://the-odds-api.com/#get-access
					 * @example abc123ABC456abc123ABC456abc123ABC456abc1
					 */
					apiKey: string;
					/**
					 * @description Format of returned timestamps. Can be iso (ISO8601) or unix timestamp (seconds since epoch)
					 * @example iso
					 */
					dateFormat?: 'iso' | 'unix';
					/** @description Comma-separated event ids. Filters the response to only return events for the specified ids, provided those events have not expired */
					eventIds?: string;
					/**
					 * @description Filters the response to show events that commence on and after this parameter. Values are in ISO8601 format
					 * @example 2023-09-09T00:00:00Z
					 */
					commenceTimeFrom?: string;
					/**
					 * @description Filters the response to show events that commence on and before this parameter. Values are in ISO8601 format
					 * @example 2023-09-09T00:00:00Z
					 */
					commenceTimeTo?: string;
					/**
					 * @description The timestamp of the data snapshot to be returned, specified in ISO8601 format. The API will return the closest snapshot equal to or earlier than the provided date parameter
					 * @example 2023-10-10T12:15:00Z
					 */
					date: string;
				};
				header?: never;
				path: {
					/**
					 * @description sport key for which to return events and odds. This is obtained from the /sports endpoint
					 * @example americanfootball_nfl
					 */
					sport: string;
				};
				cookie?: never;
			};
			requestBody?: never;
			responses: {
				/** @description A list of live and upcoming events for the specified sport, as they appeared at the specified timestamp (date parameter), excluding odds */
				200: {
					headers: {
						/** @description The number of requests remaining until the quota resets */
						'x-requests-remaining'?: number;
						/** @description The number of requests used since the last quota reset */
						'x-requests-used'?: number;
						/** @description The usage cost of the last API call */
						'x-requests-last'?: number;
						[name: string]: unknown;
					};
					content: {
						'application/json': {
							/**
							 * @description The timestamp of the snapshot. This will be the closest available timestamp equal to or earlier than the provided date parameter.
							 * @example 2023-10-10T12:10:39Z
							 */
							timestamp?: string;
							/**
							 * @description The preceding available timestamp. This can be used as the date parameter in a new request to move back in time.
							 * @example 2023-10-10T12:05:39Z
							 */
							previous_timestamp?: string;
							/**
							 * @description The next available timestamp. This can be used as the date parameter in a new request to move forward in time.
							 * @example 2023-10-10T12:15:39Z
							 */
							next_timestamp?: string;
							/** @description A list of live and upcoming events */
							data?: {
								id?: components['schemas']['MatchId'];
								sport_key?: components['schemas']['SportKey'];
								sport_title?: components['schemas']['SportTitle'];
								commence_time?: components['schemas']['CommenceTime'];
								home_team?: components['schemas']['HomeTeam'];
								away_team?: components['schemas']['AwayTeam'];
							}[];
						};
					};
				};
				/** @description Unauthenticated or unauthorized. The API key might be missing or invalid (unauthenticated), or it might at its usage limit (unauthorized). The repsonse body will contain more info */
				401: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
				/** @description One or more of the query params are invalid. The repsonse body will contain more info */
				422: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
				/** @description Requests are being sent too frequently - the request was throttled */
				429: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
				/** @description Internal error */
				500: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
			};
		};
	};
	'/v4/historical/sports/{sport}/events/{eventId}/odds': {
		parameters: {
			path?: never;
			query?: never;
			header?: never;
			cookie?: never;
		};

		options?: never;
		delete?: never;
		trace?: never;
		patch?: never;
		head?: never;
		post?: never;
		put?: never;

		get: {
			parameters: {
				query: {
					/**
					 * @description Access key (40 characters). Get an API key at https://the-odds-api.com/#get-access
					 * @example abc123ABC456abc123ABC456abc123ABC456abc1
					 */
					apiKey: string;
					/**
					 * @description Determines which bookmakers appear in the response. Multiple regions can be specified if comma delimited. Most use cases will only need to specify one region. See [the full list of bookmakers by region](https://the-odds-api.com/sports-odds-data/bookmaker-apis.html)
					 * @example us
					 */
					regions: 'uk' | 'us' | 'us2' | 'eu' | 'au';
					/**
					 * @description The odds markets to return. Multiple markets can be specified if comma delimited. Defaults to h2h (head to head / moneyline). Outrights only avaialable for select sports. See [the full list of supported market keys](https://the-odds-api.com/sports-odds-data/betting-markets.html)
					 * @example player_pass_tds,alternate_spreads
					 */
					markets?: string;
					/**
					 * @description Format of returned timestamps. Can be iso (ISO8601) or unix timestamp (seconds since epoch)
					 * @example iso
					 */
					dateFormat?: 'iso' | 'unix';
					/**
					 * @description Format of returned odds
					 * @example decimal
					 */
					oddsFormat?: 'decimal' | 'american';
					/** @description Comma-separated list of bookmakers to be returned. If both `bookmakers` and `regions` are specified, `bookmakers` takes precendence. Bookmakers can be from any region. Every group of 10 bookmakers counts as 1 request. For example for a single market, specifying up to 10 bookmakers counts as 1 request. Specifying between 11 and 20 bookmakers counts as 2 requests */
					bookmakers?: string;
					/**
					 * @description The timestamp of the data snapshot to be returned, specified in ISO8601 format. The API will return the closest snapshot equal to or earlier than the provided date parameter
					 * @example 2023-10-10T12:15:00Z
					 */
					date: string;
				};
				header?: never;
				path: {
					/**
					 * @description sport key for which to return events and odds. This is obtained from the /sports endpoint
					 * @example americanfootball_nfl
					 */
					sport: string;
					/**
					 * @description Event ids can be found in the `id` field in the response of the historical events endpoint (see `/v4/historical/sports/{sports}/events`). If the event had expired at the specified timestamp (not receiving updates due to completion or cancellation), a HTTP 404 status code will be returned.
					 * @example 50f069186530f68051f2a978745931b5
					 */
					eventId: string;
				};
				cookie?: never;
			};
			requestBody?: never;
			responses: {
				/** @description The event with the eventId specified in the path parameter. Includes odds from bookmakers in the specified region for the specified markets */
				200: {
					headers: {
						/** @description The number of requests remaining until the quota resets */
						'x-requests-remaining'?: number;
						/** @description The number of requests used since the last quota reset */
						'x-requests-used'?: number;
						/** @description The usage cost of the last API call */
						'x-requests-last'?: number;
						[name: string]: unknown;
					};
					content: {
						'application/json': {
							/**
							 * @description The timestamp of the snapshot. This will be the closest available timestamp equal to or earlier than the provided date parameter.
							 * @example 2023-10-10T12:10:39Z
							 */
							timestamp?: string;
							/**
							 * @description The preceding available timestamp. This can be used as the date parameter in a new request to move back in time.
							 * @example 2023-10-10T12:05:39Z
							 */
							previous_timestamp?: string;
							/**
							 * @description The next available timestamp. This can be used as the date parameter in a new request to move forward in time.
							 * @example 2023-10-10T12:15:39Z
							 */
							next_timestamp?: string;
							data?: {
								id?: components['schemas']['MatchId'];
								sport_key?: components['schemas']['SportKey'];
								sport_title?: components['schemas']['SportTitle'];
								commence_time?: components['schemas']['CommenceTime'];
								home_team?: components['schemas']['HomeTeam'];
								away_team?: components['schemas']['AwayTeam'];
								bookmakers?: {
									/**
									 * @description A unique slug (key) of the bookmaker
									 * @example draftkings
									 */
									key?: string;
									/**
									 * @description A formatted title of the bookmaker
									 * @example DraftKings
									 */
									title?: string;
									/** @description The included market depends on the specified 'markets' GET param. */
									markets?: {
										/**
										 * @description The unique key for the odds market
										 * @example alternate_spreads
										 */
										key?: string;
										/**
										 * Format: date-time
										 * @description A timestamp of when the markets's odds were last read. Will be an integer if dateFormat=unix, otherwise it will be a string.
										 * @example 2023-10-10T12:10:29Z
										 */
										last_update?: string;
										/** @example [
										 *       {
										 *         "name": "Houston Texans",
										 *         "price": 5.08,
										 *         "point": -23
										 *       },
										 *       {
										 *         "name": "Houston Texans",
										 *         "price": 4.82,
										 *         "point": -22.5
										 *       },
										 *       {
										 *         "name": "Houston Texans",
										 *         "price": 4.66,
										 *         "point": -22
										 *       },
										 *       {
										 *         "name": "Kansas City Chiefs",
										 *         "price": 1.15,
										 *         "point": 23
										 *       },
										 *       {
										 *         "name": "Kansas City Chiefs",
										 *         "price": 1.17,
										 *         "point": 22.5
										 *       },
										 *       {
										 *         "name": "Kansas City Chiefs",
										 *         "price": 1.17,
										 *         "point": 22
										 *       }
										 *     ] */
										outcomes?: components['schemas']['Outcome'][];
									}[];
								}[];
							};
						};
					};
				};
				/** @description Unauthenticated or unauthorized. The API key might be missing or invalid (unauthenticated), or it might at its usage limit (unauthorized). The repsonse body will contain more info */
				401: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
				/** @description The event id is invalid or the event has expired */
				404: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
				/** @description One or more of the query params are invalid. The repsonse body will contain more info */
				422: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
				/** @description Requests are being sent too frequently - the request was throttled */
				429: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
				/** @description Internal error */
				500: {
					headers: {
						[name: string]: unknown;
					};
					content?: never;
				};
			};
		};
	};
}

export interface components {
	schemas: {
		Outcome: {
			/**
			 * @description The outcome label. The value will depend on the market. For totals markets, this will be 'Over' or 'Under'. For team markets, it will be the name of the team or participant, or 'Draw'
			 * @example Houston Texans
			 */
			name?: string;
			/**
			 * @description The odds of the outcome. The format is determined by the oddsFormat query param. The format is decimal by default.
			 * @example 2.23
			 */
			price?: number;
			/**
			 * @description The handicap or points of the outcome, only applicable to spreads and totals markets (this property will be missing for h2h and outrights markets)
			 * @example 20.5
			 */
			point?: number | null;
			/** @description This field is only relevant for certain markets. It contains more information about the outcome (for example, for player prop markets, it includes the player's name) */
			description?: string | null;
		};
		/**
		 * @description A unique 32 character identifier for the event.
		 * @example e912304de2b2ce35b473ce2ecd3d1502
		 */
		MatchId: string;
		/**
		 * @description A unique slug for the sport. Use this as the "sport" param in /odds requests
		 * @example americanfootball_nfl
		 */
		SportKey: string;
		/**
		 * @description A presentable title of the sport. Occassionally this value can change, for example if a league undergoes a name change or change in sponsorship.
		 * @example NFL
		 */
		SportTitle: string;
		/**
		 * Format: date-time
		 * @description The match start time (ISO 8601 formatted). This will be unix timestamp integer if the dateFormat query param is set to dateFormat=unix.
		 * @example 2023-10-11T23:10:00Z
		 */
		CommenceTime: string;
		/**
		 * @description The home team. If home/away is not applicable for the sport (such as MMA and Tennis), it will be one of the participants. Null for outrights (futures) events.
		 * @example Houston Texans
		 */
		HomeTeam: string | null;
		/**
		 * @description The away team. If home/away is not applicable for the sport (such as MMA and Tennis), it will be one of the participants. Null for outrights (futures) events.
		 * @example Kansas City Chiefs
		 */
		AwayTeam: string | null;
		ScoreModel: {
			/**
			 * @description The participant name
			 * @example Houston Texans
			 */
			name?: string;
			/**
			 * @description The most recent score for the participant
			 * @example 20
			 */
			score?: string;
		};
	};
	responses: never;
	parameters: never;
	requestBodies: never;
	headers: never;
	pathItems: never;
}
