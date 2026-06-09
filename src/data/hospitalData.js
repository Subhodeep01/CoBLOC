const patients = 
[
  {
    "id": 1,
    "mrdNo": "385844",
    "age": 88,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "OPD",
    "dateOfAdmission": "11/10/2017",
    "durationOfStay": 7,
    "icuStay": 6,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "No specific diagnosis"
    ],
    "genre": "discharged"
  },
  {
    "id": 2,
    "mrdNo": "636185",
    "age": 58,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "04/02/2019",
    "durationOfStay": 4,
    "icuStay": 3,
    "outcome": "Discharge",
    "ejectionFraction": 38,
    "diagnoses": [
      "Acs"
    ],
    "genre": "discharged"
  },
  {
    "id": 3,
    "mrdNo": "146721",
    "age": 50,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "6/9/2017",
    "durationOfStay": 3,
    "icuStay": 3,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Atypical Chest Pain",
      "Heart Failure",
      "Hfnef"
    ],
    "genre": "discharged"
  },
  {
    "id": 4,
    "mrdNo": "27690",
    "age": 44,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "25/01/2018",
    "durationOfStay": 2,
    "icuStay": 1,
    "outcome": "DAMA",
    "ejectionFraction": null,
    "diagnoses": [
      "Orthostatic"
    ],
    "genre": "dama"
  },
  {
    "id": 5,
    "mrdNo": "74694",
    "age": 80,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "30/10/2018",
    "durationOfStay": 12,
    "icuStay": 6,
    "outcome": "Discharge",
    "ejectionFraction": 32,
    "diagnoses": [
      "Chb",
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 6,
    "mrdNo": "635999",
    "age": 43,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "11/11/2018",
    "durationOfStay": 15,
    "icuStay": 5,
    "outcome": "Discharge",
    "ejectionFraction": 25,
    "diagnoses": [
      "Anaemia",
      "Heart Failure",
      "Hfnef"
    ],
    "genre": "discharged"
  },
  {
    "id": 7,
    "mrdNo": "590578",
    "age": 50,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "03/10/2018",
    "durationOfStay": 5,
    "icuStay": 5,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Heart Failure",
      "Hfref"
    ],
    "genre": "discharged"
  },
  {
    "id": 8,
    "mrdNo": "348126",
    "age": 78,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "9/15/2017",
    "durationOfStay": 2,
    "icuStay": 0,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Atypical Chest Pain",
      "Heart Failure",
      "Hfnef",
      "Uti"
    ],
    "genre": "discharged"
  },
  {
    "id": 9,
    "mrdNo": "462860",
    "age": 67,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "21/02/2018",
    "durationOfStay": 8,
    "icuStay": 6,
    "outcome": "Discharge",
    "ejectionFraction": 32,
    "diagnoses": [
      "Heart Failure",
      "Hfref",
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 10,
    "mrdNo": "201418",
    "age": 79,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "13/04/2018",
    "durationOfStay": 4,
    "icuStay": 1,
    "outcome": "Discharge",
    "ejectionFraction": null,
    "diagnoses": [
      "No specific diagnosis"
    ],
    "genre": "discharged"
  },
  {
    "id": 11,
    "mrdNo": "374482",
    "age": 44,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "10/24/2017",
    "durationOfStay": 7,
    "icuStay": 0,
    "outcome": "Discharge",
    "ejectionFraction": 45,
    "diagnoses": [
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 12,
    "mrdNo": "147815",
    "age": 65,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "30/01/2019",
    "durationOfStay": 15,
    "icuStay": 15,
    "outcome": "DAMA",
    "ejectionFraction": 34,
    "diagnoses": [
      "Heart Failure",
      "Hfnef",
      "Aki"
    ],
    "genre": "dama"
  },
  {
    "id": 13,
    "mrdNo": "362651",
    "age": 61,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "03/08/2018",
    "durationOfStay": 10,
    "icuStay": 10,
    "outcome": "Discharge",
    "ejectionFraction": 35,
    "diagnoses": [
      "Anaemia"
    ],
    "genre": "discharged"
  },
  {
    "id": 14,
    "mrdNo": "454316",
    "age": 75,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "OPD",
    "dateOfAdmission": "3/8/2018",
    "durationOfStay": 6,
    "icuStay": 6,
    "outcome": "Discharge",
    "ejectionFraction": 44,
    "diagnoses": [
      "No specific diagnosis"
    ],
    "genre": "discharged"
  },
  {
    "id": 15,
    "mrdNo": "560814",
    "age": 32,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "15/08/2018",
    "durationOfStay": 9,
    "icuStay": 9,
    "outcome": "Discharge",
    "ejectionFraction": 30,
    "diagnoses": [
      "Acs",
      "Stemi",
      "Heart Failure",
      "Hfnef",
      "Valvular"
    ],
    "genre": "discharged"
  },
  {
    "id": 16,
    "mrdNo": "340636",
    "age": 46,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "OPD",
    "dateOfAdmission": "9/6/2017",
    "durationOfStay": 5,
    "icuStay": 0,
    "outcome": "Discharge",
    "ejectionFraction": 45,
    "diagnoses": [
      "Stable Angina"
    ],
    "genre": "discharged"
  },
  {
    "id": 17,
    "mrdNo": "360154",
    "age": 70,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "10/3/2017",
    "durationOfStay": 1,
    "icuStay": 1,
    "outcome": "Expiry",
    "ejectionFraction": 60,
    "diagnoses": [
      "No specific diagnosis"
    ],
    "genre": "expired"
  },
  {
    "id": 18,
    "mrdNo": "143762",
    "age": 69,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "12/4/2017",
    "durationOfStay": 7,
    "icuStay": 5,
    "outcome": "Discharge",
    "ejectionFraction": 30,
    "diagnoses": [
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 19,
    "mrdNo": "397717",
    "age": 60,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "12/2/2017",
    "durationOfStay": 6,
    "icuStay": 5,
    "outcome": "Discharge",
    "ejectionFraction": 45,
    "diagnoses": [
      "Heart Failure",
      "Hfnef",
      "Cardiogenic Shock"
    ],
    "genre": "discharged"
  },
  {
    "id": 20,
    "mrdNo": "590544",
    "age": 72,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "28/09/2018",
    "durationOfStay": 5,
    "icuStay": 2,
    "outcome": "Discharge",
    "ejectionFraction": 45,
    "diagnoses": [
      "Acs"
    ],
    "genre": "discharged"
  },
  {
    "id": 21,
    "mrdNo": "385022",
    "age": 64,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "OPD",
    "dateOfAdmission": "3/10/2018",
    "durationOfStay": 10,
    "icuStay": 8,
    "outcome": "Discharge",
    "ejectionFraction": 35,
    "diagnoses": [
      "Anaemia",
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 22,
    "mrdNo": "569215",
    "age": 50,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "27/12/2017",
    "durationOfStay": 5,
    "icuStay": 3,
    "outcome": "Discharge",
    "ejectionFraction": 45,
    "diagnoses": [
      "Acs",
      "Stemi"
    ],
    "genre": "discharged"
  },
  {
    "id": 23,
    "mrdNo": "155867",
    "age": 87,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "6/11/2017",
    "durationOfStay": 6,
    "icuStay": 2,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Aki",
      "Congenital"
    ],
    "genre": "discharged"
  },
  {
    "id": 24,
    "mrdNo": "406663",
    "age": 51,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "2/7/2019",
    "durationOfStay": 7,
    "icuStay": 7,
    "outcome": "Expiry",
    "ejectionFraction": 22,
    "diagnoses": [
      "Valvular",
      "Aki"
    ],
    "genre": "expired"
  },
  {
    "id": 25,
    "mrdNo": "298229",
    "age": 75,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "10/10/2018",
    "durationOfStay": 2,
    "icuStay": 1,
    "outcome": "Discharge",
    "ejectionFraction": 45,
    "diagnoses": [
      "Severe Anaemia",
      "Anaemia"
    ],
    "genre": "discharged"
  },
  {
    "id": 26,
    "mrdNo": "148405",
    "age": 72,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "29/10/2018",
    "durationOfStay": 3,
    "icuStay": 0,
    "outcome": "Discharge",
    "ejectionFraction": 52,
    "diagnoses": [
      "Stable Angina"
    ],
    "genre": "discharged"
  },
  {
    "id": 27,
    "mrdNo": "150122",
    "age": 68,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "7/8/2017",
    "durationOfStay": 2,
    "icuStay": 0,
    "outcome": "Discharge",
    "ejectionFraction": 55,
    "diagnoses": [
      "Stable Angina"
    ],
    "genre": "discharged"
  },
  {
    "id": 28,
    "mrdNo": "698027",
    "age": 65,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "28/03/2019",
    "durationOfStay": 5,
    "icuStay": 3,
    "outcome": "DAMA",
    "ejectionFraction": 45,
    "diagnoses": [
      "Acs",
      "Aki"
    ],
    "genre": "dama"
  },
  {
    "id": 29,
    "mrdNo": "279744",
    "age": 77,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "6/5/2017",
    "durationOfStay": 9,
    "icuStay": 3,
    "outcome": "Discharge",
    "ejectionFraction": 35,
    "diagnoses": [
      "Severe Anaemia",
      "Anaemia",
      "Acs"
    ],
    "genre": "discharged"
  },
  {
    "id": 30,
    "mrdNo": "582031",
    "age": 60,
    "gender": "F",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "19/09/2018",
    "durationOfStay": 10,
    "icuStay": 7,
    "outcome": "Discharge",
    "ejectionFraction": 54,
    "diagnoses": [
      "Vt"
    ],
    "genre": "discharged"
  },
  {
    "id": 31,
    "mrdNo": "322823",
    "age": 65,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "10/29/2017",
    "durationOfStay": 2,
    "icuStay": 0,
    "outcome": "Discharge",
    "ejectionFraction": 28,
    "diagnoses": [
      "No specific diagnosis"
    ],
    "genre": "discharged"
  },
  {
    "id": 32,
    "mrdNo": "508245",
    "age": 86,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "14/12/2017",
    "durationOfStay": 5,
    "icuStay": 5,
    "outcome": "Discharge",
    "ejectionFraction": 35,
    "diagnoses": [
      "Anaemia",
      "Acs",
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 33,
    "mrdNo": "255628",
    "age": 37,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "11/1/2017",
    "durationOfStay": 4,
    "icuStay": 2,
    "outcome": "Discharge",
    "ejectionFraction": 55,
    "diagnoses": [
      "Acs",
      "Stemi"
    ],
    "genre": "discharged"
  },
  {
    "id": 34,
    "mrdNo": "338827",
    "age": 52,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "8/31/2017",
    "durationOfStay": 12,
    "icuStay": 11,
    "outcome": "Discharge",
    "ejectionFraction": 32,
    "diagnoses": [
      "Uti"
    ],
    "genre": "discharged"
  },
  {
    "id": 35,
    "mrdNo": "383245",
    "age": 49,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "3/2/2018",
    "durationOfStay": 2,
    "icuStay": 2,
    "outcome": "Expiry",
    "ejectionFraction": 24,
    "diagnoses": [
      "Anaemia",
      "Heart Failure",
      "Hfref",
      "Aki",
      "Cardiogenic Shock",
      "Shock"
    ],
    "genre": "expired"
  },
  {
    "id": 36,
    "mrdNo": "507460",
    "age": 53,
    "gender": "F",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "27/05/2018",
    "durationOfStay": 5,
    "icuStay": 2,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Atypical Chest Pain"
    ],
    "genre": "discharged"
  },
  {
    "id": 37,
    "mrdNo": "340350",
    "age": 60,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "9/2/2017",
    "durationOfStay": 2,
    "icuStay": 1,
    "outcome": "Discharge",
    "ejectionFraction": 30,
    "diagnoses": [
      "No specific diagnosis"
    ],
    "genre": "discharged"
  },
  {
    "id": 38,
    "mrdNo": "405272",
    "age": 63,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "02/01/2019",
    "durationOfStay": 8,
    "icuStay": 4,
    "outcome": "Discharge",
    "ejectionFraction": 52,
    "diagnoses": [
      "No specific diagnosis"
    ],
    "genre": "discharged"
  },
  {
    "id": 39,
    "mrdNo": "511548",
    "age": 66,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "06/02/2018",
    "durationOfStay": 1,
    "icuStay": 0,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Stable Angina"
    ],
    "genre": "discharged"
  },
  {
    "id": 40,
    "mrdNo": "342425",
    "age": 57,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "9/6/2017",
    "durationOfStay": 8,
    "icuStay": 8,
    "outcome": "Discharge",
    "ejectionFraction": 22,
    "diagnoses": [
      "Heart Failure",
      "Hfref"
    ],
    "genre": "discharged"
  },
  {
    "id": 41,
    "mrdNo": "255698",
    "age": 58,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "5/1/2017",
    "durationOfStay": 5,
    "icuStay": 1,
    "outcome": "Discharge",
    "ejectionFraction": 40,
    "diagnoses": [
      "Acs",
      "Stemi"
    ],
    "genre": "discharged"
  },
  {
    "id": 42,
    "mrdNo": "454471",
    "age": 86,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "3/8/2018",
    "durationOfStay": 10,
    "icuStay": 8,
    "outcome": "Discharge",
    "ejectionFraction": 40,
    "diagnoses": [
      "Acs",
      "Heart Failure",
      "Hfnef"
    ],
    "genre": "discharged"
  },
  {
    "id": 43,
    "mrdNo": "642514",
    "age": 64,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "24/12/2018",
    "durationOfStay": 6,
    "icuStay": 5,
    "outcome": "Discharge",
    "ejectionFraction": 32,
    "diagnoses": [
      "Acs",
      "Stemi"
    ],
    "genre": "discharged"
  },
  {
    "id": 44,
    "mrdNo": "428164",
    "age": 29,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "26/01/2018",
    "durationOfStay": 19,
    "icuStay": 15,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Chest Infection"
    ],
    "genre": "discharged"
  },
  {
    "id": 45,
    "mrdNo": "287302",
    "age": 45,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "22/11/2018",
    "durationOfStay": 6,
    "icuStay": 1,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Anaemia"
    ],
    "genre": "discharged"
  },
  {
    "id": 46,
    "mrdNo": "375404",
    "age": 78,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "21/08/2018",
    "durationOfStay": 11,
    "icuStay": 9,
    "outcome": "Discharge",
    "ejectionFraction": 35,
    "diagnoses": [
      "Anaemia",
      "Heart Failure",
      "Hfnef",
      "Aki",
      "Af"
    ],
    "genre": "discharged"
  },
  {
    "id": 47,
    "mrdNo": "365006",
    "age": 55,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "10/10/2017",
    "durationOfStay": 11,
    "icuStay": 8,
    "outcome": "Discharge",
    "ejectionFraction": 32,
    "diagnoses": [
      "Acs",
      "Stemi",
      "Vt"
    ],
    "genre": "discharged"
  },
  {
    "id": 48,
    "mrdNo": "465441",
    "age": 72,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "25/03/2018",
    "durationOfStay": 1,
    "icuStay": 0,
    "outcome": "Discharge",
    "ejectionFraction": 50,
    "diagnoses": [
      "Acs",
      "Stemi",
      "Chb"
    ],
    "genre": "discharged"
  },
  {
    "id": 49,
    "mrdNo": "419324",
    "age": 54,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "14/01/2018",
    "durationOfStay": 9,
    "icuStay": 5,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Heart Failure",
      "Hfref",
      "Chb"
    ],
    "genre": "discharged"
  },
  {
    "id": 50,
    "mrdNo": "176062",
    "age": 74,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "OPD",
    "dateOfAdmission": "07/02/2019",
    "durationOfStay": 27,
    "icuStay": 10,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 51,
    "mrdNo": "682988",
    "age": 82,
    "gender": "F",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "05/03/2019",
    "durationOfStay": 18,
    "icuStay": 18,
    "outcome": "Discharge",
    "ejectionFraction": 50,
    "diagnoses": [
      "Af",
      "Dvt",
      "Pulmonary Embolism"
    ],
    "genre": "discharged"
  },
  {
    "id": 52,
    "mrdNo": "687212",
    "age": 42,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "12/03/2019",
    "durationOfStay": 3,
    "icuStay": 3,
    "outcome": "DAMA",
    "ejectionFraction": 60,
    "diagnoses": [
      "Acs"
    ],
    "genre": "dama"
  },
  {
    "id": 53,
    "mrdNo": "647498",
    "age": 67,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "03/01/2019",
    "durationOfStay": 7,
    "icuStay": 2,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Heart Failure",
      "Hfref"
    ],
    "genre": "discharged"
  },
  {
    "id": 54,
    "mrdNo": "426411",
    "age": 6,
    "gender": "F",
    "rural": "Rural",
    "admissionType": "OPD",
    "dateOfAdmission": "21/08/2018",
    "durationOfStay": 4,
    "icuStay": 1,
    "outcome": "Discharge",
    "ejectionFraction": null,
    "diagnoses": [
      "Congenital"
    ],
    "genre": "discharged"
  },
  {
    "id": 55,
    "mrdNo": "681681",
    "age": 52,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "3/24/2019",
    "durationOfStay": 2,
    "icuStay": 2,
    "outcome": "Expiry",
    "ejectionFraction": 25,
    "diagnoses": [
      "Acs",
      "Stemi",
      "Heart Failure",
      "Hfref",
      "Aki",
      "Vt"
    ],
    "genre": "expired"
  },
  {
    "id": 56,
    "mrdNo": "657232",
    "age": 42,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "21/01/2019",
    "durationOfStay": 5,
    "icuStay": 2,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Heart Failure",
      "Hfref"
    ],
    "genre": "discharged"
  },
  {
    "id": 57,
    "mrdNo": "631265",
    "age": 60,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "03/12/2018",
    "durationOfStay": 5,
    "icuStay": 5,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Acs"
    ],
    "genre": "discharged"
  },
  {
    "id": 58,
    "mrdNo": "668832",
    "age": 80,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "11/02/2019",
    "durationOfStay": 5,
    "icuStay": 2,
    "outcome": "Discharge",
    "ejectionFraction": 54,
    "diagnoses": [
      "Acs"
    ],
    "genre": "discharged"
  },
  {
    "id": 59,
    "mrdNo": "268951",
    "age": 74,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "5/19/2017",
    "durationOfStay": 5,
    "icuStay": 5,
    "outcome": "Discharge",
    "ejectionFraction": 50,
    "diagnoses": [
      "Acs"
    ],
    "genre": "discharged"
  },
  {
    "id": 60,
    "mrdNo": "365917",
    "age": 46,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "11/6/2017",
    "durationOfStay": 3,
    "icuStay": 3,
    "outcome": "Discharge",
    "ejectionFraction": 45,
    "diagnoses": [
      "Anaemia",
      "Heart Failure",
      "Hfnef"
    ],
    "genre": "discharged"
  },
  {
    "id": 61,
    "mrdNo": "358562",
    "age": 52,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "9/29/2017",
    "durationOfStay": 24,
    "icuStay": 2,
    "outcome": "Expiry",
    "ejectionFraction": 30,
    "diagnoses": [
      "Anaemia",
      "Heart Failure",
      "Hfref",
      "Aki"
    ],
    "genre": "expired"
  },
  {
    "id": 62,
    "mrdNo": "278060",
    "age": 65,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "27/02/2018",
    "durationOfStay": 4,
    "icuStay": 2,
    "outcome": "Discharge",
    "ejectionFraction": 30,
    "diagnoses": [
      "Heart Failure",
      "Hfnef",
      "Uti",
      "Shock"
    ],
    "genre": "discharged"
  },
  {
    "id": 63,
    "mrdNo": "625808",
    "age": 55,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "24/11/2018",
    "durationOfStay": 1,
    "icuStay": 1,
    "outcome": "DAMA",
    "ejectionFraction": 25,
    "diagnoses": [
      "Heart Failure",
      "Hfnef"
    ],
    "genre": "dama"
  },
  {
    "id": 64,
    "mrdNo": "640642",
    "age": 56,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "21/12/2018",
    "durationOfStay": 4,
    "icuStay": 0,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Stable Angina"
    ],
    "genre": "discharged"
  },
  {
    "id": 65,
    "mrdNo": "694687",
    "age": 35,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "23/03/2019",
    "durationOfStay": 11,
    "icuStay": 8,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Anaemia",
      "Psvt"
    ],
    "genre": "discharged"
  },
  {
    "id": 66,
    "mrdNo": "159541",
    "age": 70,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "19/12/2018",
    "durationOfStay": 13,
    "icuStay": 6,
    "outcome": "Discharge",
    "ejectionFraction": 36,
    "diagnoses": [
      "Severe Anaemia",
      "Anaemia"
    ],
    "genre": "discharged"
  },
  {
    "id": 67,
    "mrdNo": "537484",
    "age": 70,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "06/12/2018",
    "durationOfStay": 12,
    "icuStay": 9,
    "outcome": "Discharge",
    "ejectionFraction": 32,
    "diagnoses": [
      "No specific diagnosis"
    ],
    "genre": "discharged"
  },
  {
    "id": 68,
    "mrdNo": "690832",
    "age": 55,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "18/03/2019",
    "durationOfStay": 3,
    "icuStay": 1,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Acs"
    ],
    "genre": "discharged"
  },
  {
    "id": 69,
    "mrdNo": "659415",
    "age": 80,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "25/01/2019",
    "durationOfStay": 5,
    "icuStay": 4,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Acs"
    ],
    "genre": "discharged"
  },
  {
    "id": 70,
    "mrdNo": "475195",
    "age": 60,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "01/02/2019",
    "durationOfStay": 8,
    "icuStay": 4,
    "outcome": "Discharge",
    "ejectionFraction": 32,
    "diagnoses": [
      "Heart Failure",
      "Hfnef"
    ],
    "genre": "discharged"
  },
  {
    "id": 71,
    "mrdNo": "400380",
    "age": 67,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "12/7/2017",
    "durationOfStay": 3,
    "icuStay": 3,
    "outcome": "Discharge",
    "ejectionFraction": 50,
    "diagnoses": [
      "No specific diagnosis"
    ],
    "genre": "discharged"
  },
  {
    "id": 72,
    "mrdNo": "379331",
    "age": 50,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "31/10/2017",
    "durationOfStay": 5,
    "icuStay": 0,
    "outcome": "Discharge",
    "ejectionFraction": null,
    "diagnoses": [
      "No specific diagnosis"
    ],
    "genre": "discharged"
  },
  {
    "id": 73,
    "mrdNo": "90522",
    "age": 65,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "04/03/2019",
    "durationOfStay": 16,
    "icuStay": 10,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Chb"
    ],
    "genre": "discharged"
  },
  {
    "id": 74,
    "mrdNo": "647965",
    "age": 81,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "24/01/2019",
    "durationOfStay": 4,
    "icuStay": 4,
    "outcome": "Discharge",
    "ejectionFraction": 34,
    "diagnoses": [
      "Acs",
      "Heart Failure",
      "Hfnef",
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 75,
    "mrdNo": "281444",
    "age": 56,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "11/20/2017",
    "durationOfStay": 3,
    "icuStay": 3,
    "outcome": "Discharge",
    "ejectionFraction": 45,
    "diagnoses": [
      "Acs",
      "Stemi"
    ],
    "genre": "discharged"
  },
  {
    "id": 76,
    "mrdNo": "385043",
    "age": 60,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "OPD",
    "dateOfAdmission": "4/9/2017",
    "durationOfStay": 7,
    "icuStay": 5,
    "outcome": "Discharge",
    "ejectionFraction": 28,
    "diagnoses": [
      "Cardiogenic Shock"
    ],
    "genre": "discharged"
  },
  {
    "id": 77,
    "mrdNo": "584169",
    "age": 33,
    "gender": "F",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "18/09/2018",
    "durationOfStay": 2,
    "icuStay": 1,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Atypical Chest Pain"
    ],
    "genre": "discharged"
  },
  {
    "id": 78,
    "mrdNo": "622932",
    "age": 66,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "11/24/2018",
    "durationOfStay": 1,
    "icuStay": 0,
    "outcome": "Expiry",
    "ejectionFraction": 60,
    "diagnoses": [
      "Cva Infract",
      "Cva Bleed",
      "Af"
    ],
    "genre": "expired"
  },
  {
    "id": 79,
    "mrdNo": "120898",
    "age": 61,
    "gender": "F",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "7/2/2017",
    "durationOfStay": 3,
    "icuStay": 1,
    "outcome": "Discharge",
    "ejectionFraction": 50,
    "diagnoses": [
      "No specific diagnosis"
    ],
    "genre": "discharged"
  },
  {
    "id": 80,
    "mrdNo": "391930",
    "age": 75,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "11/22/2017",
    "durationOfStay": 4,
    "icuStay": 4,
    "outcome": "DAMA",
    "ejectionFraction": 30,
    "diagnoses": [
      "Acs",
      "Chb"
    ],
    "genre": "dama"
  },
  {
    "id": 81,
    "mrdNo": "620587",
    "age": 68,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "15/11/2018",
    "durationOfStay": 6,
    "icuStay": 6,
    "outcome": "DAMA",
    "ejectionFraction": 34,
    "diagnoses": [
      "Acs",
      "Heart Failure",
      "Hfnef"
    ],
    "genre": "dama"
  },
  {
    "id": 82,
    "mrdNo": "345500",
    "age": 65,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "9/9/2017",
    "durationOfStay": 11,
    "icuStay": 4,
    "outcome": "Discharge",
    "ejectionFraction": 34,
    "diagnoses": [
      "Anaemia",
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 83,
    "mrdNo": "274860",
    "age": 76,
    "gender": "F",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "5/29/2017",
    "durationOfStay": 11,
    "icuStay": 9,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Acs",
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 84,
    "mrdNo": "633358",
    "age": 82,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "06/12/2018",
    "durationOfStay": 11,
    "icuStay": 10,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Chest Infection"
    ],
    "genre": "discharged"
  },
  {
    "id": 85,
    "mrdNo": "618636",
    "age": 47,
    "gender": "F",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "13/11/2018",
    "durationOfStay": 13,
    "icuStay": 11,
    "outcome": "Discharge",
    "ejectionFraction": null,
    "diagnoses": [
      "Severe Anaemia",
      "Anaemia",
      "Heart Failure",
      "Hfnef",
      "Uti"
    ],
    "genre": "discharged"
  },
  {
    "id": 86,
    "mrdNo": "397492",
    "age": 52,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "12/14/2017",
    "durationOfStay": 14,
    "icuStay": 3,
    "outcome": "Expiry",
    "ejectionFraction": 25,
    "diagnoses": [
      "Severe Anaemia",
      "Anaemia",
      "Heart Failure",
      "Hfref",
      "Aki",
      "Uti",
      "Cardiogenic Shock",
      "Shock"
    ],
    "genre": "expired"
  },
  {
    "id": 87,
    "mrdNo": "504063",
    "age": 32,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "23/05/2018",
    "durationOfStay": 4,
    "icuStay": 0,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Dvt"
    ],
    "genre": "discharged"
  },
  {
    "id": 88,
    "mrdNo": "628252",
    "age": 53,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "28/11/2018",
    "durationOfStay": 3,
    "icuStay": 2,
    "outcome": "DAMA",
    "ejectionFraction": 55,
    "diagnoses": [
      "Acs",
      "Stemi"
    ],
    "genre": "dama"
  },
  {
    "id": 89,
    "mrdNo": "178279",
    "age": 65,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "4/2/2017",
    "durationOfStay": 1,
    "icuStay": 0,
    "outcome": "Expiry",
    "ejectionFraction": 25,
    "diagnoses": [
      "Heart Failure",
      "Hfref",
      "Aki"
    ],
    "genre": "expired"
  },
  {
    "id": 90,
    "mrdNo": "677247",
    "age": 49,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "24/02/2019",
    "durationOfStay": 7,
    "icuStay": 6,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Anaemia",
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 91,
    "mrdNo": "494469",
    "age": 70,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "OPD",
    "dateOfAdmission": "20/01/2019",
    "durationOfStay": 6,
    "icuStay": 0,
    "outcome": "Discharge",
    "ejectionFraction": 32,
    "diagnoses": [
      "Heart Failure",
      "Hfnef"
    ],
    "genre": "discharged"
  },
  {
    "id": 92,
    "mrdNo": "346203",
    "age": 72,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "OPD",
    "dateOfAdmission": "10/31/2017",
    "durationOfStay": 8,
    "icuStay": 0,
    "outcome": "Discharge",
    "ejectionFraction": 28,
    "diagnoses": [
      "Acs",
      "Stemi",
      "Chb"
    ],
    "genre": "discharged"
  },
  {
    "id": 93,
    "mrdNo": "425770",
    "age": 45,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "20/02/2018",
    "durationOfStay": 4,
    "icuStay": 2,
    "outcome": "Discharge",
    "ejectionFraction": 32,
    "diagnoses": [
      "Atypical Chest Pain",
      "Heart Failure",
      "Hfref"
    ],
    "genre": "discharged"
  },
  {
    "id": 94,
    "mrdNo": "259876",
    "age": 67,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "5/7/2017",
    "durationOfStay": 8,
    "icuStay": 8,
    "outcome": "Discharge",
    "ejectionFraction": 25,
    "diagnoses": [
      "Acs",
      "Heart Failure",
      "Hfref",
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 95,
    "mrdNo": "615093",
    "age": 51,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "05/11/2018",
    "durationOfStay": 22,
    "icuStay": 22,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Anaemia",
      "Aki",
      "Shock"
    ],
    "genre": "discharged"
  },
  {
    "id": 96,
    "mrdNo": "383707",
    "age": 72,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "11/7/2017",
    "durationOfStay": 4,
    "icuStay": 4,
    "outcome": "Discharge",
    "ejectionFraction": 28,
    "diagnoses": [
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 97,
    "mrdNo": "572078",
    "age": 43,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "OPD",
    "dateOfAdmission": "13/09/2018",
    "durationOfStay": 2,
    "icuStay": 0,
    "outcome": "Discharge",
    "ejectionFraction": 16,
    "diagnoses": [
      "Stable Angina",
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 98,
    "mrdNo": "534596",
    "age": 60,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "09/07/2018",
    "durationOfStay": 6,
    "icuStay": 4,
    "outcome": "Discharge",
    "ejectionFraction": 38,
    "diagnoses": [
      "Heart Failure",
      "Hfnef"
    ],
    "genre": "discharged"
  },
  {
    "id": 99,
    "mrdNo": "303533",
    "age": 18,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "7/10/2017",
    "durationOfStay": 13,
    "icuStay": 2,
    "outcome": "Discharge",
    "ejectionFraction": 48,
    "diagnoses": [
      "Severe Anaemia",
      "Anaemia",
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 100,
    "mrdNo": "581235",
    "age": 70,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "11/12/2018",
    "durationOfStay": 2,
    "icuStay": 0,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Acs"
    ],
    "genre": "discharged"
  },
  {
    "id": 101,
    "mrdNo": "544668",
    "age": 72,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "7/23/2018",
    "durationOfStay": 2,
    "icuStay": 2,
    "outcome": "Expiry",
    "ejectionFraction": 40,
    "diagnoses": [
      "Heart Failure",
      "Hfnef"
    ],
    "genre": "expired"
  },
  {
    "id": 102,
    "mrdNo": "683611",
    "age": 40,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "07/03/2019",
    "durationOfStay": 6,
    "icuStay": 0,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Heart Failure",
      "Hfref"
    ],
    "genre": "discharged"
  },
  {
    "id": 103,
    "mrdNo": "256410",
    "age": 52,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "5/2/2017",
    "durationOfStay": 8,
    "icuStay": 4,
    "outcome": "Discharge",
    "ejectionFraction": 34,
    "diagnoses": [
      "Acs",
      "Stemi"
    ],
    "genre": "discharged"
  },
  {
    "id": 104,
    "mrdNo": "574349",
    "age": 72,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "04/09/2018",
    "durationOfStay": 8,
    "icuStay": 8,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Heart Failure",
      "Hfref",
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 105,
    "mrdNo": "450033",
    "age": 54,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "2/1/2019",
    "durationOfStay": 1,
    "icuStay": 1,
    "outcome": "Expiry",
    "ejectionFraction": null,
    "diagnoses": [
      "Anaemia",
      "Heart Failure",
      "Hfref",
      "Aki"
    ],
    "genre": "expired"
  },
  {
    "id": 106,
    "mrdNo": "607681",
    "age": 64,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "OPD",
    "dateOfAdmission": "24/10/2018",
    "durationOfStay": 9,
    "icuStay": 6,
    "outcome": "Discharge",
    "ejectionFraction": 32,
    "diagnoses": [
      "Acs",
      "Stemi"
    ],
    "genre": "discharged"
  },
  {
    "id": 107,
    "mrdNo": "54253",
    "age": 69,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "16/10/2018",
    "durationOfStay": 18,
    "icuStay": 15,
    "outcome": "Discharge",
    "ejectionFraction": null,
    "diagnoses": [
      "Heart Failure",
      "Hfnef"
    ],
    "genre": "discharged"
  },
  {
    "id": 108,
    "mrdNo": "194716",
    "age": 65,
    "gender": "F",
    "rural": "Rural",
    "admissionType": "OPD",
    "dateOfAdmission": "11/24/2017",
    "durationOfStay": 18,
    "icuStay": 8,
    "outcome": "Discharge",
    "ejectionFraction": 58,
    "diagnoses": [
      "Valvular",
      "Chb"
    ],
    "genre": "discharged"
  },
  {
    "id": 109,
    "mrdNo": "595455",
    "age": 50,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "26/10/2017",
    "durationOfStay": 8,
    "icuStay": 5,
    "outcome": "Discharge",
    "ejectionFraction": 35,
    "diagnoses": [
      "Acs"
    ],
    "genre": "discharged"
  },
  {
    "id": 110,
    "mrdNo": "180369",
    "age": 67,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "11/1/2017",
    "durationOfStay": 3,
    "icuStay": 1,
    "outcome": "Discharge",
    "ejectionFraction": null,
    "diagnoses": [
      "Severe Anaemia",
      "Anaemia",
      "Uti"
    ],
    "genre": "discharged"
  },
  {
    "id": 111,
    "mrdNo": "158316",
    "age": 66,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "6/26/2017",
    "durationOfStay": 10,
    "icuStay": 7,
    "outcome": "Discharge",
    "ejectionFraction": 25,
    "diagnoses": [
      "Heart Failure",
      "Hfref",
      "Aki",
      "Cva Infract",
      "Af"
    ],
    "genre": "discharged"
  },
  {
    "id": 112,
    "mrdNo": "240740",
    "age": 45,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "12/5/2017",
    "durationOfStay": 4,
    "icuStay": 3,
    "outcome": "Discharge",
    "ejectionFraction": 36,
    "diagnoses": [
      "Anaemia",
      "Heart Failure",
      "Hfref",
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 113,
    "mrdNo": "457238",
    "age": 55,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "13/03/2018",
    "durationOfStay": 6,
    "icuStay": 4,
    "outcome": "Discharge",
    "ejectionFraction": 34,
    "diagnoses": [
      "No specific diagnosis"
    ],
    "genre": "discharged"
  },
  {
    "id": 114,
    "mrdNo": "404788",
    "age": 78,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "OPD",
    "dateOfAdmission": "12/14/2017",
    "durationOfStay": 4,
    "icuStay": 3,
    "outcome": "Discharge",
    "ejectionFraction": 33,
    "diagnoses": [
      "Stable Angina"
    ],
    "genre": "discharged"
  },
  {
    "id": 115,
    "mrdNo": "692217",
    "age": 51,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "26/03/2018",
    "durationOfStay": 4,
    "icuStay": 9,
    "outcome": "Discharge",
    "ejectionFraction": 35,
    "diagnoses": [
      "Acs",
      "Stemi"
    ],
    "genre": "discharged"
  },
  {
    "id": 116,
    "mrdNo": "392485",
    "age": 64,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "28/09/2018",
    "durationOfStay": 3,
    "icuStay": 2,
    "outcome": "Discharge",
    "ejectionFraction": 35,
    "diagnoses": [
      "Acs",
      "Heart Failure",
      "Hfnef"
    ],
    "genre": "discharged"
  },
  {
    "id": 117,
    "mrdNo": "350973",
    "age": 58,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "8/18/2017",
    "durationOfStay": 3,
    "icuStay": 0,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Heart Failure",
      "Hfnef",
      "Valvular"
    ],
    "genre": "discharged"
  },
  {
    "id": 118,
    "mrdNo": "560952",
    "age": 64,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "16/08/2018",
    "durationOfStay": 9,
    "icuStay": 7,
    "outcome": "Discharge",
    "ejectionFraction": 32,
    "diagnoses": [
      "Acs",
      "Stemi"
    ],
    "genre": "discharged"
  },
  {
    "id": 119,
    "mrdNo": "582717",
    "age": 87,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "15/09/2018",
    "durationOfStay": 4,
    "icuStay": 3,
    "outcome": "DAMA",
    "ejectionFraction": 60,
    "diagnoses": [
      "Aki",
      "Pulmonary Embolism"
    ],
    "genre": "dama"
  },
  {
    "id": 120,
    "mrdNo": "9039",
    "age": 30,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "12/14/2017",
    "durationOfStay": 4,
    "icuStay": 1,
    "outcome": "Discharge",
    "ejectionFraction": 30,
    "diagnoses": [
      "Heart Failure",
      "Hfref"
    ],
    "genre": "discharged"
  },
  {
    "id": 121,
    "mrdNo": "204703",
    "age": 69,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "7/17/2017",
    "durationOfStay": 5,
    "icuStay": 2,
    "outcome": "Discharge",
    "ejectionFraction": 38,
    "diagnoses": [
      "No specific diagnosis"
    ],
    "genre": "discharged"
  },
  {
    "id": 122,
    "mrdNo": "381446",
    "age": 32,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "03/11/2017",
    "durationOfStay": 2,
    "icuStay": 0,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Heart Failure",
      "Hfnef"
    ],
    "genre": "discharged"
  },
  {
    "id": 123,
    "mrdNo": "398694",
    "age": 45,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "12/5/2017",
    "durationOfStay": 2,
    "icuStay": 0,
    "outcome": "Discharge",
    "ejectionFraction": 55,
    "diagnoses": [
      "No specific diagnosis"
    ],
    "genre": "discharged"
  },
  {
    "id": 124,
    "mrdNo": "705126",
    "age": 67,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "OPD",
    "dateOfAdmission": "08/01/2018",
    "durationOfStay": 14,
    "icuStay": 3,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Acs"
    ],
    "genre": "discharged"
  },
  {
    "id": 125,
    "mrdNo": "82587",
    "age": 71,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "24/05/2018",
    "durationOfStay": 9,
    "icuStay": 7,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Valvular",
      "Pulmonary Embolism"
    ],
    "genre": "discharged"
  },
  {
    "id": 126,
    "mrdNo": "673167",
    "age": 30,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "18/02/2018",
    "durationOfStay": 6,
    "icuStay": 5,
    "outcome": "Discharge",
    "ejectionFraction": 50,
    "diagnoses": [
      "Acs"
    ],
    "genre": "discharged"
  },
  {
    "id": 127,
    "mrdNo": "332067",
    "age": 45,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "8/19/2017",
    "durationOfStay": 4,
    "icuStay": 2,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "No specific diagnosis"
    ],
    "genre": "discharged"
  },
  {
    "id": 128,
    "mrdNo": "440341",
    "age": 55,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "15/02/2018",
    "durationOfStay": 8,
    "icuStay": 7,
    "outcome": "Discharge",
    "ejectionFraction": 36,
    "diagnoses": [
      "Acs",
      "Heart Failure",
      "Hfnef",
      "Aki",
      "Uti"
    ],
    "genre": "discharged"
  },
  {
    "id": 129,
    "mrdNo": "568230",
    "age": 68,
    "gender": "F",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "25/08/2018",
    "durationOfStay": 12,
    "icuStay": 7,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Anaemia",
      "Acs",
      "Chb"
    ],
    "genre": "discharged"
  },
  {
    "id": 130,
    "mrdNo": "560680",
    "age": 55,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "19/11/2018",
    "durationOfStay": 6,
    "icuStay": 6,
    "outcome": "Discharge",
    "ejectionFraction": 34,
    "diagnoses": [
      "Anaemia",
      "Heart Failure",
      "Hfnef",
      "Vt"
    ],
    "genre": "discharged"
  },
  {
    "id": 131,
    "mrdNo": "570914",
    "age": 55,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "29/08/2018",
    "durationOfStay": 6,
    "icuStay": 5,
    "outcome": "Discharge",
    "ejectionFraction": 55,
    "diagnoses": [
      "Acs"
    ],
    "genre": "discharged"
  },
  {
    "id": 132,
    "mrdNo": "304112",
    "age": 66,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "7/10/2017",
    "durationOfStay": 2,
    "icuStay": 2,
    "outcome": "Discharge",
    "ejectionFraction": 35,
    "diagnoses": [
      "No specific diagnosis"
    ],
    "genre": "discharged"
  },
  {
    "id": 133,
    "mrdNo": "345022",
    "age": 62,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "9/9/2017",
    "durationOfStay": 5,
    "icuStay": 4,
    "outcome": "Discharge",
    "ejectionFraction": 38,
    "diagnoses": [
      "Acs",
      "Stemi"
    ],
    "genre": "discharged"
  },
  {
    "id": 134,
    "mrdNo": "372194",
    "age": 88,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "4/21/2017",
    "durationOfStay": 13,
    "icuStay": 5,
    "outcome": "Discharge",
    "ejectionFraction": 48,
    "diagnoses": [
      "Aki",
      "Uti"
    ],
    "genre": "discharged"
  },
  {
    "id": 135,
    "mrdNo": "676453",
    "age": 76,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "06/03/2018",
    "durationOfStay": 7,
    "icuStay": 7,
    "outcome": "Discharge",
    "ejectionFraction": 42,
    "diagnoses": [
      "Acs",
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 136,
    "mrdNo": "452999",
    "age": 75,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "3/7/2018",
    "durationOfStay": 1,
    "icuStay": 1,
    "outcome": "Expiry",
    "ejectionFraction": 22,
    "diagnoses": [
      "Anaemia",
      "Heart Failure",
      "Hfref",
      "Aki",
      "Cva Infract",
      "Af"
    ],
    "genre": "expired"
  },
  {
    "id": 137,
    "mrdNo": "547044",
    "age": 34,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "22/09/2018",
    "durationOfStay": 2,
    "icuStay": 0,
    "outcome": "Discharge",
    "ejectionFraction": null,
    "diagnoses": [
      "Stable Angina"
    ],
    "genre": "discharged"
  },
  {
    "id": 138,
    "mrdNo": "548752",
    "age": 24,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "28/07/2018",
    "durationOfStay": 14,
    "icuStay": 11,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Heart Failure",
      "Hfref"
    ],
    "genre": "discharged"
  },
  {
    "id": 139,
    "mrdNo": "639790",
    "age": 52,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "12/18/2018",
    "durationOfStay": 7,
    "icuStay": 7,
    "outcome": "Expiry",
    "ejectionFraction": 15,
    "diagnoses": [
      "Acs",
      "Aki",
      "Cardiogenic Shock",
      "Shock"
    ],
    "genre": "expired"
  },
  {
    "id": 140,
    "mrdNo": "361888",
    "age": 70,
    "gender": "F",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "10/5/2017",
    "durationOfStay": 3,
    "icuStay": 3,
    "outcome": "Discharge",
    "ejectionFraction": 40,
    "diagnoses": [
      "No specific diagnosis"
    ],
    "genre": "discharged"
  },
  {
    "id": 141,
    "mrdNo": "473978",
    "age": 65,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "06/08/2018",
    "durationOfStay": 7,
    "icuStay": 0,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 142,
    "mrdNo": "292597",
    "age": 70,
    "gender": "F",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "30/06/2018",
    "durationOfStay": 5,
    "icuStay": 3,
    "outcome": "Discharge",
    "ejectionFraction": null,
    "diagnoses": [
      "Uti"
    ],
    "genre": "discharged"
  },
  {
    "id": 143,
    "mrdNo": "228268",
    "age": 54,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "20/02/2018",
    "durationOfStay": 4,
    "icuStay": 2,
    "outcome": "Discharge",
    "ejectionFraction": 35,
    "diagnoses": [
      "Heart Failure",
      "Hfnef",
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 144,
    "mrdNo": "500896",
    "age": 47,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "18/05/2018",
    "durationOfStay": 6,
    "icuStay": 4,
    "outcome": "Discharge",
    "ejectionFraction": 38,
    "diagnoses": [
      "Acs",
      "Heart Failure",
      "Hfnef",
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 145,
    "mrdNo": "516701",
    "age": 74,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "17/01/2019",
    "durationOfStay": 8,
    "icuStay": 2,
    "outcome": "Discharge",
    "ejectionFraction": 38,
    "diagnoses": [
      "No specific diagnosis"
    ],
    "genre": "discharged"
  },
  {
    "id": 146,
    "mrdNo": "154402",
    "age": 64,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "11/25/2017",
    "durationOfStay": 3,
    "icuStay": 3,
    "outcome": "Expiry",
    "ejectionFraction": 30,
    "diagnoses": [
      "Acs",
      "Heart Failure",
      "Hfref",
      "Aki",
      "Vt",
      "Cardiogenic Shock",
      "Shock"
    ],
    "genre": "expired"
  },
  {
    "id": 147,
    "mrdNo": "440466",
    "age": 61,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "25/06/2018",
    "durationOfStay": 3,
    "icuStay": 2,
    "outcome": "Discharge",
    "ejectionFraction": 48,
    "diagnoses": [
      "Stable Angina"
    ],
    "genre": "discharged"
  },
  {
    "id": 148,
    "mrdNo": "477612",
    "age": 52,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "12/04/2018",
    "durationOfStay": 7,
    "icuStay": 5,
    "outcome": "Discharge",
    "ejectionFraction": 36,
    "diagnoses": [
      "Acs",
      "Stemi"
    ],
    "genre": "discharged"
  },
  {
    "id": 149,
    "mrdNo": "299105",
    "age": 55,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "7/3/2017",
    "durationOfStay": 11,
    "icuStay": 7,
    "outcome": "Discharge",
    "ejectionFraction": 50,
    "diagnoses": [
      "Valvular",
      "Aki",
      "Af",
      "Uti"
    ],
    "genre": "discharged"
  },
  {
    "id": 150,
    "mrdNo": "306284",
    "age": 65,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "7/18/2017",
    "durationOfStay": 11,
    "icuStay": 7,
    "outcome": "Discharge",
    "ejectionFraction": 25,
    "diagnoses": [
      "Chb",
      "Uti"
    ],
    "genre": "discharged"
  },
  {
    "id": 151,
    "mrdNo": "683701",
    "age": 56,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "06/03/2019",
    "durationOfStay": 3,
    "icuStay": 3,
    "outcome": "Discharge",
    "ejectionFraction": null,
    "diagnoses": [
      "Acs"
    ],
    "genre": "discharged"
  },
  {
    "id": 152,
    "mrdNo": "662475",
    "age": 45,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "OPD",
    "dateOfAdmission": "30/01/2019",
    "durationOfStay": 2,
    "icuStay": 0,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Atypical Chest Pain",
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 153,
    "mrdNo": "652919",
    "age": 63,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "OPD",
    "dateOfAdmission": "12/01/2019",
    "durationOfStay": 2,
    "icuStay": 0,
    "outcome": "Discharge",
    "ejectionFraction": 35,
    "diagnoses": [
      "Acs"
    ],
    "genre": "discharged"
  },
  {
    "id": 154,
    "mrdNo": "555610",
    "age": 75,
    "gender": "F",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "08/08/2018",
    "durationOfStay": 4,
    "icuStay": 1,
    "outcome": "Discharge",
    "ejectionFraction": 42,
    "diagnoses": [
      "Severe Anaemia",
      "Anaemia",
      "Acs",
      "Heart Failure",
      "Hfref"
    ],
    "genre": "discharged"
  },
  {
    "id": 155,
    "mrdNo": "266469",
    "age": 64,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "8/16/2017",
    "durationOfStay": 3,
    "icuStay": 3,
    "outcome": "Discharge",
    "ejectionFraction": 32,
    "diagnoses": [
      "Acs",
      "Stemi",
      "Heart Failure",
      "Hfref",
      "Chb",
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 156,
    "mrdNo": "391130",
    "age": 64,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "11/20/2017",
    "durationOfStay": 2,
    "icuStay": 2,
    "outcome": "Discharge",
    "ejectionFraction": 30,
    "diagnoses": [
      "Anaemia",
      "Heart Failure",
      "Hfref",
      "Aki",
      "Cva Infract"
    ],
    "genre": "discharged"
  },
  {
    "id": 157,
    "mrdNo": "156012",
    "age": 72,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "27/03/2019",
    "durationOfStay": 2,
    "icuStay": 1,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Heart Failure",
      "Hfref"
    ],
    "genre": "discharged"
  },
  {
    "id": 158,
    "mrdNo": "258145",
    "age": 53,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "5/7/2017",
    "durationOfStay": 7,
    "icuStay": 5,
    "outcome": "Discharge",
    "ejectionFraction": 50,
    "diagnoses": [
      "Acs",
      "Stemi"
    ],
    "genre": "discharged"
  },
  {
    "id": 159,
    "mrdNo": "191710",
    "age": 72,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "5/17/2017",
    "durationOfStay": 7,
    "icuStay": 3,
    "outcome": "Discharge",
    "ejectionFraction": 24,
    "diagnoses": [
      "Anaemia",
      "Aki",
      "Af"
    ],
    "genre": "discharged"
  },
  {
    "id": 160,
    "mrdNo": "289690",
    "age": 70,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "6/19/2017",
    "durationOfStay": 10,
    "icuStay": 10,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Pulmonary Embolism"
    ],
    "genre": "discharged"
  },
  {
    "id": 161,
    "mrdNo": "477096",
    "age": 75,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "11/04/2018",
    "durationOfStay": 8,
    "icuStay": 4,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Heart Failure",
      "Hfref",
      "Chb"
    ],
    "genre": "discharged"
  },
  {
    "id": 162,
    "mrdNo": "670370",
    "age": 54,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "13/02/2019",
    "durationOfStay": 4,
    "icuStay": 4,
    "outcome": "Discharge",
    "ejectionFraction": 37,
    "diagnoses": [
      "Acs"
    ],
    "genre": "discharged"
  },
  {
    "id": 163,
    "mrdNo": "437866",
    "age": 67,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "21/03/2018",
    "durationOfStay": 5,
    "icuStay": 0,
    "outcome": "Discharge",
    "ejectionFraction": 32,
    "diagnoses": [
      "No specific diagnosis"
    ],
    "genre": "discharged"
  },
  {
    "id": 164,
    "mrdNo": "518718",
    "age": 88,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "09/12/2018",
    "durationOfStay": 14,
    "icuStay": 12,
    "outcome": "Discharge",
    "ejectionFraction": 35,
    "diagnoses": [
      "Heart Failure",
      "Hfnef"
    ],
    "genre": "discharged"
  },
  {
    "id": 165,
    "mrdNo": "252412",
    "age": 61,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "08/12/2018",
    "durationOfStay": 9,
    "icuStay": 7,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "No specific diagnosis"
    ],
    "genre": "discharged"
  },
  {
    "id": 166,
    "mrdNo": "651762",
    "age": 63,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "11/01/2019",
    "durationOfStay": 8,
    "icuStay": 4,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Acs",
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 167,
    "mrdNo": "288960",
    "age": 66,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "6/20/2017",
    "durationOfStay": 2,
    "icuStay": 1,
    "outcome": "Discharge",
    "ejectionFraction": null,
    "diagnoses": [
      "Acs"
    ],
    "genre": "discharged"
  },
  {
    "id": 168,
    "mrdNo": "156839",
    "age": 62,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "7/5/2017",
    "durationOfStay": 10,
    "icuStay": 6,
    "outcome": "Discharge",
    "ejectionFraction": 30,
    "diagnoses": [
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 169,
    "mrdNo": "500673",
    "age": 62,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "17/05/2018",
    "durationOfStay": 1,
    "icuStay": 1,
    "outcome": "DAMA",
    "ejectionFraction": 50,
    "diagnoses": [
      "Acs"
    ],
    "genre": "dama"
  },
  {
    "id": 170,
    "mrdNo": "595317",
    "age": 80,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "05/10/2018",
    "durationOfStay": 5,
    "icuStay": 5,
    "outcome": "Discharge",
    "ejectionFraction": 50,
    "diagnoses": [
      "Acs",
      "Heart Failure",
      "Hfref"
    ],
    "genre": "discharged"
  },
  {
    "id": 171,
    "mrdNo": "303981",
    "age": 73,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "02/11/2018",
    "durationOfStay": 4,
    "icuStay": 2,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 172,
    "mrdNo": "269736",
    "age": 49,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "5/20/2017",
    "durationOfStay": 11,
    "icuStay": 7,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Aki",
      "Cva Infract",
      "Uti"
    ],
    "genre": "discharged"
  },
  {
    "id": 173,
    "mrdNo": "377724",
    "age": 69,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "10/29/2017",
    "durationOfStay": 11,
    "icuStay": 7,
    "outcome": "DAMA",
    "ejectionFraction": 40,
    "diagnoses": [
      "Anaemia",
      "Acs",
      "Stemi",
      "Aki"
    ],
    "genre": "dama"
  },
  {
    "id": 174,
    "mrdNo": "608737",
    "age": 65,
    "gender": "F",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "25/10/2018",
    "durationOfStay": 12,
    "icuStay": 10,
    "outcome": "Discharge",
    "ejectionFraction": 30,
    "diagnoses": [
      "Anaemia",
      "Acs",
      "Heart Failure",
      "Hfnef",
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 175,
    "mrdNo": "449949",
    "age": 78,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "01/02/2018",
    "durationOfStay": 2,
    "icuStay": 0,
    "outcome": "Discharge",
    "ejectionFraction": null,
    "diagnoses": [
      "Anaemia",
      "Dvt"
    ],
    "genre": "discharged"
  },
  {
    "id": 176,
    "mrdNo": "570877",
    "age": 10,
    "gender": "F",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "29/08/2018",
    "durationOfStay": 4,
    "icuStay": 3,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Anaemia"
    ],
    "genre": "discharged"
  },
  {
    "id": 177,
    "mrdNo": "417831",
    "age": 70,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "08/01/2018",
    "durationOfStay": 5,
    "icuStay": 2,
    "outcome": "Discharge",
    "ejectionFraction": 40,
    "diagnoses": [
      "Acs",
      "Stemi"
    ],
    "genre": "discharged"
  },
  {
    "id": 178,
    "mrdNo": "511358",
    "age": 67,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "01/06/2018",
    "durationOfStay": 4,
    "icuStay": 2,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "No specific diagnosis"
    ],
    "genre": "discharged"
  },
  {
    "id": 179,
    "mrdNo": "494221",
    "age": 89,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "5/8/2018",
    "durationOfStay": 31,
    "icuStay": 16,
    "outcome": "Expiry",
    "ejectionFraction": 40,
    "diagnoses": [
      "Anaemia",
      "Acs",
      "Stemi",
      "Chb",
      "Vt",
      "Cardiogenic Shock",
      "Shock"
    ],
    "genre": "expired"
  },
  {
    "id": 180,
    "mrdNo": "497718",
    "age": 60,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "5/13/2018",
    "durationOfStay": 8,
    "icuStay": 7,
    "outcome": "Discharge",
    "ejectionFraction": 32,
    "diagnoses": [
      "Congenital"
    ],
    "genre": "discharged"
  },
  {
    "id": 181,
    "mrdNo": "399035",
    "age": 26,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "04/12/2017",
    "durationOfStay": 7,
    "icuStay": 4,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "No specific diagnosis"
    ],
    "genre": "discharged"
  },
  {
    "id": 182,
    "mrdNo": "258190",
    "age": 59,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "5/5/2017",
    "durationOfStay": 5,
    "icuStay": 2,
    "outcome": "Discharge",
    "ejectionFraction": 60,
    "diagnoses": [
      "Acs"
    ],
    "genre": "discharged"
  },
  {
    "id": 183,
    "mrdNo": "56539",
    "age": 54,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "6/6/2017",
    "durationOfStay": 2,
    "icuStay": 0,
    "outcome": "Discharge",
    "ejectionFraction": null,
    "diagnoses": [
      "Stable Angina"
    ],
    "genre": "discharged"
  },
  {
    "id": 184,
    "mrdNo": "524388",
    "age": 70,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "05/07/2018",
    "durationOfStay": 9,
    "icuStay": 3,
    "outcome": "Discharge",
    "ejectionFraction": 42,
    "diagnoses": [
      "No specific diagnosis"
    ],
    "genre": "discharged"
  },
  {
    "id": 185,
    "mrdNo": "294235",
    "age": 52,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "11/10/2017",
    "durationOfStay": 6,
    "icuStay": 2,
    "outcome": "Discharge",
    "ejectionFraction": 38,
    "diagnoses": [
      "Acs",
      "Stemi",
      "Aki",
      "Vt",
      "Uti",
      "Dvt"
    ],
    "genre": "discharged"
  },
  {
    "id": 186,
    "mrdNo": "357200",
    "age": 73,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "4/20/2018",
    "durationOfStay": 4,
    "icuStay": 2,
    "outcome": "Discharge",
    "ejectionFraction": null,
    "diagnoses": [
      "Aki",
      "Cardiogenic Shock",
      "Shock"
    ],
    "genre": "discharged"
  },
  {
    "id": 187,
    "mrdNo": "592151",
    "age": 76,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "01/10/2017",
    "durationOfStay": 45,
    "icuStay": 45,
    "outcome": "DAMA",
    "ejectionFraction": 32,
    "diagnoses": [
      "Anaemia",
      "Acs",
      "Heart Failure",
      "Hfnef",
      "Valvular",
      "Vt",
      "Shock"
    ],
    "genre": "dama"
  },
  {
    "id": 188,
    "mrdNo": "588117",
    "age": 50,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "24/09/2018",
    "durationOfStay": 7,
    "icuStay": 4,
    "outcome": "Discharge",
    "ejectionFraction": 35,
    "diagnoses": [
      "Acs",
      "Heart Failure",
      "Hfnef"
    ],
    "genre": "discharged"
  },
  {
    "id": 189,
    "mrdNo": "317994",
    "age": 80,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "7/31/2017",
    "durationOfStay": 4,
    "icuStay": 3,
    "outcome": "Discharge",
    "ejectionFraction": 28,
    "diagnoses": [
      "Acs",
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 190,
    "mrdNo": "391339",
    "age": 68,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "OPD",
    "dateOfAdmission": "12/24/2017",
    "durationOfStay": 3,
    "icuStay": 2,
    "outcome": "Discharge",
    "ejectionFraction": null,
    "diagnoses": [
      "Anaemia",
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 191,
    "mrdNo": "392306",
    "age": 79,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "29/11/2018",
    "durationOfStay": 5,
    "icuStay": 5,
    "outcome": "Discharge",
    "ejectionFraction": 48,
    "diagnoses": [
      "Acs",
      "Af"
    ],
    "genre": "discharged"
  },
  {
    "id": 192,
    "mrdNo": "437708",
    "age": 51,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "21/12/2018",
    "durationOfStay": 7,
    "icuStay": 4,
    "outcome": "Discharge",
    "ejectionFraction": 37,
    "diagnoses": [
      "Heart Failure",
      "Hfnef"
    ],
    "genre": "discharged"
  },
  {
    "id": 193,
    "mrdNo": "402430",
    "age": 60,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "OPD",
    "dateOfAdmission": "12/11/2017",
    "durationOfStay": 3,
    "icuStay": 2,
    "outcome": "Discharge",
    "ejectionFraction": 47,
    "diagnoses": [
      "Stable Angina"
    ],
    "genre": "discharged"
  },
  {
    "id": 194,
    "mrdNo": "370774",
    "age": 45,
    "gender": "F",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "10/25/2017",
    "durationOfStay": 5,
    "icuStay": 0,
    "outcome": "Discharge",
    "ejectionFraction": 32,
    "diagnoses": [
      "Acs"
    ],
    "genre": "discharged"
  },
  {
    "id": 195,
    "mrdNo": "685039",
    "age": 70,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "08/03/2018",
    "durationOfStay": 10,
    "icuStay": 6,
    "outcome": "Discharge",
    "ejectionFraction": null,
    "diagnoses": [
      "Acs"
    ],
    "genre": "discharged"
  },
  {
    "id": 196,
    "mrdNo": "296791",
    "age": 50,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "6/30/2017",
    "durationOfStay": 6,
    "icuStay": 4,
    "outcome": "Discharge",
    "ejectionFraction": 36,
    "diagnoses": [
      "Acs",
      "Heart Failure",
      "Hfref",
      "Uti"
    ],
    "genre": "discharged"
  },
  {
    "id": 197,
    "mrdNo": "663262",
    "age": 75,
    "gender": "F",
    "rural": "Rural",
    "admissionType": "OPD",
    "dateOfAdmission": "02/11/2018",
    "durationOfStay": 1,
    "icuStay": 1,
    "outcome": "Discharge",
    "ejectionFraction": 48,
    "diagnoses": [
      "No specific diagnosis"
    ],
    "genre": "discharged"
  },
  {
    "id": 198,
    "mrdNo": "207220",
    "age": 70,
    "gender": "F",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "8/22/2017",
    "durationOfStay": 5,
    "icuStay": 4,
    "outcome": "Discharge",
    "ejectionFraction": 45,
    "diagnoses": [
      "Aki",
      "Uti"
    ],
    "genre": "discharged"
  },
  {
    "id": 199,
    "mrdNo": "391339",
    "age": 68,
    "gender": "M",
    "rural": "Urban",
    "admissionType": "Emergency",
    "dateOfAdmission": "11/21/2017",
    "durationOfStay": 5,
    "icuStay": 2,
    "outcome": "Discharge",
    "ejectionFraction": 28,
    "diagnoses": [
      "Anaemia",
      "Stable Angina",
      "Heart Failure",
      "Hfref",
      "Aki"
    ],
    "genre": "discharged"
  },
  {
    "id": 200,
    "mrdNo": "708557",
    "age": 58,
    "gender": "M",
    "rural": "Rural",
    "admissionType": "Emergency",
    "dateOfAdmission": "13/04/2018",
    "durationOfStay": 6,
    "icuStay": 6,
    "outcome": "Discharge",
    "ejectionFraction": 50,
    "diagnoses": [
      "Acs",
      "Stemi",
      "Heart Failure",
      "Hfref"
    ],
    "genre": "discharged"
  }
]
;

export default patients;
