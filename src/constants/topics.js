export const TOPICS = {
  Movies: {
    label: 'Movies',
    protectedAttribute: 'Genre',
    monitorOnly: false,
    itemLabel: 'movies',
    constraints: {
      'light-hearted': '',
      'dark-themed': '',
      'neutral': '',
    },
    protectedAttributes: [
      {
        label: 'Genre',
        field: 'genre',
        constraints: { 'light-hearted': '', 'dark-themed': '', 'neutral': '' },
      },
      {
        label: 'Rating',
        field: 'ratingCategory',
        constraints: { 'high': '', 'medium': '', 'low': '' },
      },
    ],
  },
  'Hospital Admissions Data': {
    label: 'Hospital Admissions Data',
    protectedAttribute: 'Hospitalization Outcome',
    monitorOnly: true,
    itemLabel: 'patients',
    constraints: {
      discharged: '',
      expired: '',
      dama: '',
    },
    protectedAttributes: [
      {
        label: 'Hospitalization Outcome',
        constraints: { discharged: '', expired: '', dama: '' },
      },
      {
        label: 'Primary Diagnosis',
        constraints: { acs: '', 'heart-failure': '', anaemia: '' },
      },
    ],
  },
  'Live Kafka Stream': {
    label: 'Live Kafka Stream',
    protectedAttribute: 'Attribute',
    monitorOnly: true,
    live: true,
    itemLabel: 'items',
    constraints: {},          // populated dynamically from /api/attributes
    protectedAttributes: [
      { label: 'Attribute', field: 'genre', constraints: {} },
    ],
  },
};

export const TOPIC_NAMES = Object.keys(TOPICS);
