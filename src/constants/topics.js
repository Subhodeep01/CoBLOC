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
  'Stocks': {
    label: 'Stocks',
    live: true,
    monitorOnly: true,
    itemLabel: 'records',
    constraints: {},
    protectedAttributes: [
      { label: 'Price Change', column: 'PRICE_CHANGE_BIN', constraints: {} },
      { label: 'Volume', column: 'VOLUME_BIN', constraints: {} },
    ],
  },
};

export const TOPIC_NAMES = Object.keys(TOPICS);
