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
};

export const TOPIC_NAMES = Object.keys(TOPICS);
