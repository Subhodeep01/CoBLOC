export const TOPICS = {
  'Hospital Admissions Data': {
    label: 'Hospital Admissions Data',
    live: true,
    monitorOnly: true,
    itemLabel: 'patients',
    constraints: {},
    protectedAttributes: [
      { label: 'Gender', column: 'GENDER', constraints: {} },
      { label: 'Hospitalization Outcome', column: 'OUTCOME', constraints: {} },
      { label: 'Age', column: 'AGE_BIN', constraints: {} },
    ],
  },
  'Stocks (AAPL)': {
    label: 'Stocks (AAPL)',
    live: true,
    monitorOnly: true,
    itemLabel: 'records',
    constraints: {},
    protectedAttributes: [
      { label: 'Price Change', column: 'PRICE_CHANGE_BIN', constraints: {} },
      { label: 'Volume', column: 'VOLUME_BIN', constraints: {} },
    ],
  },
  'Tweets': {
    label: 'Tweets',
    live: true,
    monitorOnly: true,
    itemLabel: 'tweets',
    constraints: {},
    protectedAttributes: [
      { label: 'Engagement', column: 'engagement', constraints: {} },
      { label: 'Tweet Length', column: 'tweet_length_tier', constraints: {} },
      { label: 'Sentiment', column: 'sentiment', constraints: {} },
      { label: 'Topic', column: 'topic', constraints: {} },
    ],
  },
  'Movies': {
    label: 'Movies',
    live: true,
    monitorOnly: true,
    itemLabel: 'movies',
    constraints: {},
    protectedAttributes: [
      { label: 'Audience Reception', column: 'audience_reception', constraints: {} },
      { label: 'Popularity Tier', column: 'popularity_tier', constraints: {} },
      { label: 'Release Era', column: 'release_era', constraints: {} },
      { label: 'Genre', column: 'genre-1', constraints: {} },
    ],
  },
  'Census': {
    label: 'Census',
    live: true,
    monitorOnly: true,
    itemLabel: 'records',
    constraints: {},
    protectedAttributes: [
      { label: 'Sex', column: 'sex', constraints: {} },
      { label: 'Education', column: 'education_collapsed', constraints: {} },
      { label: 'Race', column: 'race', constraints: {} },
      { label: 'Marital Status', column: 'marital_status', constraints: {} },
      { label: 'Occupation', column: 'occupation', constraints: {} },
    ],
  },
};

export const TOPIC_NAMES = Object.keys(TOPICS);
