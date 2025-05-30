import Papa from "papaparse";
import { DataModel } from "../../models";
import { capitalizeFirstLetter } from "mithril-ui-form";
export * from "./questionnaire";

import observeAgressionIcon from "../../assets/icons/observe_agression.svg";
import agressionIcon from "../../assets/icons/agression.svg";
import ptsdIcon from "../../assets/icons/noun-ptsd-2529072.svg";
import victimIcon from "../../assets/icons/noun-violence-1784961.svg";
import depressionIcon from "../../assets/icons/noun-depression-7059482.svg";
import meaningIcon from "../../assets/icons/noun-purpose-6784778.svg";
import honestyIcon from "../../assets/icons/noun-honesty-7494225.svg";
import connectionIcon from "../../assets/icons/noun-holding-hands-6084035.svg";
import appreciationIcon from "../../assets/icons/noun-appreciation-7592051.svg";
import kindnessIcon from "../../assets/icons/noun-kindness-6014284.svg";
import { explanations } from "./explanations";
import {
  headerMapping,
  interviewQuestionnaire,
  questionnaire,
} from "./questionnaire";

export type LikertScale = 0 | 1 | 2 | 3 | 4 | 5;

export const categories = {
  /** zingeving, variatie, eerlijkheid, verbinding, waardering, autonomie, competenties */
  needs: "Psychologische behoeften",
  /** vermijdende coping, dwingende stijl, vriendelijkheid, zelfcontrole, vijandigheidsbias (hostility bias) */
  personality: "Persoonlijkheidsfactoren",
  /** PTSS herbeleving, Depressie opwinding, slachtoffer van geweld */
  stress: "Stress en trauma",
  /** attitude t.o.v. geweld */
  values: "Waarden",
  /** fysieke agressie vanuit de bewoner perspectief, non fysieke agressie vanuit bewoner perspectief,
   * fysieke agressie vanuit de COA medewerker perspectief, non fysieke agressie vanuit de COA medewerker perspectief
   */
  agression: "Agressief gedrag", //
};

export const likertScaleProp = [
  "honestRules",
  "nicePersonnel",
  "nicePeople",
  "caringPeople",
  "closeness",
  "dignity",
  "supportiveOfNeeds",
  "heard",
  "appreciated",
  "upset",
  "flashbacks",
  "anxiety",
  "down",
  "sleepDifficulty",
  "irritated",
  "niceActivities",
  "concentration",
  "avoidContact",
  "victimOfViolence",
  "physicalViolenceUsed",
  "lifeMeaningful",
  "senseOfPurpose",
  "meaningfulActivities",
  "violenceNeverAcceptable",
  "violAccept",
  "selfDef",
  "drugUse",
  "sleepMeds",
  "alcohol",
  "freqPhysViol",
  "selfOccupancy",
  "sufAct",
  "dailyVariation",
  "fairTreatment",
  "influence",
  "coerceOthers",
  "myWay",
  "followMe",
  "rude",
  "forgiving",
  "kind",
  "controlOverAnger",
  "impulsive",
  "angry",
  "threatening",
  "insulting",
  "deceptive",
  "freqThreatBL",
  "freqInsults",
  "freqDecept",
  "compentency1",
  "compentency2",
  "compentency3",
  "autonomy1",
  "autonomy2",
  "autonomy3",
  "hostile1",
  "hostile2",
  "hostile3",
];

export type UserLikertAnswers = {
  honestRules: LikertScale;
  nicePersonnel: LikertScale;
  nicePeople: LikertScale;
  caringPeople: LikertScale;
  closeness: LikertScale;
  dignity: LikertScale;
  supportiveOfNeeds: LikertScale;
  heard: LikertScale;
  appreciated: LikertScale;
  upset: LikertScale;
  flashbacks: LikertScale;
  anxiety: LikertScale;
  down: LikertScale;
  sleepDifficulty: LikertScale;
  irritated: LikertScale;
  niceActivities: LikertScale;
  concentration: LikertScale;
  avoidContact: LikertScale;
  victimOfViolence: LikertScale;
  physicalViolenceUsed: LikertScale;
  lifeMeaningful: LikertScale;
  senseOfPurpose: LikertScale;
  meaningfulActivities: LikertScale;
  violenceNeverAcceptable: LikertScale;
  violAccept: LikertScale;
  selfDef: LikertScale;
  drugUse: LikertScale;
  sleepMeds: LikertScale;
  alcohol: LikertScale;
  freqPhysViol: LikertScale;
  selfOccupancy: LikertScale;
  sufAct: LikertScale;
  dailyVariation: LikertScale;
  fairTreatment: LikertScale;
  influence: LikertScale;
  coerceOthers: LikertScale;
  myWay: LikertScale;
  followMe: LikertScale;
  rude: LikertScale;
  forgiving: LikertScale;
  kind: LikertScale;
  controlOverAnger: LikertScale;
  impulsive: LikertScale;
  angry: LikertScale;
  threatening: LikertScale;
  insulting: LikertScale;
  deceptive: LikertScale;
  freqThreatBL: LikertScale;
  freqInsults: LikertScale;
  freqDecept: LikertScale;
  compentency1: LikertScale;
  compentency2: LikertScale;
  compentency3: LikertScale;
  autonomy1: LikertScale;
  autonomy2: LikertScale;
  autonomy3: LikertScale;
  hostile1: LikertScale;
  hostile2: LikertScale;
  hostile3: LikertScale;
};

export enum RespondentType {
  USER = 1,
  INTERVIEWER = 2,
  STAFF = 4,
}

// Define your expected interface
export type UserEntry = Partial<UserLikertAnswers> & {
  respondentType?: RespondentType;
  respondentId?: number;
  startDate?: string;
  startTime?: string;
  /** Numeric representation of the end date, or start date */
  date?: number;
  /** Number of questions in the questionnaire */
  questionCnt?: number;
  /** Number of questions that were actually answered */
  answeredCnt?: number;
  /** Number of questions that were answered with "Zeg ik liever niet" */
  declinedCnt?: number;
  status?: string;
  gender?: string;
  /** Did you receive help while filling out the questionnaire */
  recHelp?: string;
  /** Did you receive any information from the COA staff w.r.t. this questionnaire */
  info?: string;
  age?: number | string;
  azcMonths?: number | string;
  informedConsent?: string;
  recOther?: string;
  uniqueCode?: string | number;
  // [questionId: string]: number | string | undefined; // question IDs will map to numbers
};

export type UserScore = {
  respondentId: number;
  uniqueCode: string | number;
  /** Numeric representation of the end date, or start date */
  date: number;
  /** Number of questions in the questionnaire */
  questionCnt: number;
  /** Number of questions that were actually answered */
  answeredCnt: number;
  /** Number of questions that were answered with "Zeg ik liever niet" */
  declinedCnt: number;
  // avgSignificance: number;
  // avgFairness: number;
  // avgRelatedness: number;
  // avgAppreciation: number;
  // avgPtsdReexp: number;
  // avgVictim: number;
  // avgAgreeable: number;
  // avgDepressArousal: number;
  // avgPhysAgressResidentsView: number;
  // avgNonPhysAgressResidentsView: number;
  // avgPhysAgressStaffsView: number;
  // avgNonPhysAgressStaffsView: number;
  agressionResidentsView: Factor;
  agressionStaffsView: Factor;
  ptsd: Factor;
  victim: Factor;
  depression: Factor;
  meaning: Factor;
  honesty: Factor;
  kindness: Factor;
  connection: Factor;
  appreciation: Factor;
};

export type FactorKey =
  | "agressionResidentsView"
  | "agressionStaffsView"
  | "ptsd"
  | "victim"
  | "depression"
  | "meaning"
  | "honesty"
  | "connection"
  | "appreciation"
  | "kindness";

export type Factor = {
  key: FactorKey;
  title: string;
  category: string;
  desc?: [physicalAggression: string, nonPhysicalAggression: string];
  activity?: [physicalAggression: string, nonPhysicalAggression: string];
  colors?: [paColor: string, npaColor: string];
  notAnsweredPerc: number;
  svg: string;
  score: LikertScore;
  /** If true (default), a positive score indicates a happy smiley */
  moreIsBetter?: boolean;
  /** The question keys that are used to generate the factor */
  questions: string[];
  /** The message that should be displayed when not all questions are answered */
  missingData: string;
};

export type LikertScore = [
  physicalAgression: number,
  nonPhysicalAgression: number
];

/** Return average and the percentage of questions that weren't answered */
const avg = (...values: number[]): [score: number, notAnsweredPerc: number] => {
  const [sum, length] = values.reduce(
    (acc, v) => (v ? [acc[0] + v, acc[1] + 1] : acc),
    [0, 0]
  );
  const notAnsweredPerc = Math.round(
    (100 * (values.length - length)) / values.length
  );
  return length > 0 ? [sum / length, notAnsweredPerc] : [0, notAnsweredPerc];
};

/** Some answers need to be inverted, but only if they are answered in the first place */
const invertAnswer = (value?: number): number => (!value ? 0 : 6 - value);

const modZ = (T2: number, I2: number, K2: number) =>
  T2 ? (0.6745 * (T2 - I2)) / K2 : 0;

const convertDDMMYYYYToDate = (dateString: string): Date | null => {
  const parts = dateString.split("-");
  if (parts.length !== 3) {
    return null; // Invalid format
  }

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  // Month in JavaScript Date object is 0-indexed (0 for January, 11 for December)
  if (
    isNaN(day) ||
    isNaN(month) ||
    isNaN(year) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > new Date(year, month, 0).getDate()
  ) {
    return null; // Invalid date values
  }

  return new Date(year, month - 1, day);
};

/**
 * Color scale mapper function
 * Maps numeric values to RGB colors based on different scale types
 * Scales 1 and 2 use interpolation between color points
 * Scale 3 uses ordinal (discrete) color mapping
 */

// Helper function to interpolate between two colors
const interpolateColor = (
  color1: [number, number, number],
  color2: [number, number, number],
  factor: number
): string => {
  // Ensure factor is between 0 and 1
  const clampedFactor = Math.max(0, Math.min(1, factor));

  // Linear interpolation between the RGB values
  const r = Math.round(color1[0] + clampedFactor * (color2[0] - color1[0]));
  const g = Math.round(color1[1] + clampedFactor * (color2[1] - color1[1]));
  const b = Math.round(color1[2] + clampedFactor * (color2[2] - color1[2]));

  return `rgb(${r}, ${g}, ${b})`;
};

const getColorForValue = (
  scaleType: "pa" | "npa" | "ordinal",
  value: number
): string => {
  // Define colors as RGB tuples for interpolation
  const grey: [number, number, number] = [200, 200, 200];
  const orange: [number, number, number] = [255, 165, 0];
  const red: [number, number, number] = [255, 0, 0];
  const lightGreen: [number, number, number] = [144, 238, 144];
  const green: [number, number, number] = [0, 128, 0];

  switch (scaleType) {
    case "pa": // Scale 1: Interpolated gradient scale
      if (value >= 5) {
        return `rgb(${red[0]}, ${red[1]}, ${red[2]})`;
      } else if (value >= 2) {
        // Interpolate between orange and red for values between 2 and 5
        const factor = (value - 2) / 3; // 0 at value=2, 1 at value=5
        return interpolateColor(orange, red, factor);
      } else if (value >= 1) {
        // Interpolate between white and orange for values between 1 and 2
        const factor = value - 1; // 0 at value=1, 1 at value=2
        return interpolateColor(grey, orange, factor);
      } else {
        return `rgb(${grey[0]}, ${grey[1]}, ${grey[2]})`;
      }

    case "npa": // Scale 2: Interpolated with decimal thresholds
      if (value >= 5) {
        return `rgb(${red[0]}, ${red[1]}, ${red[2]})`;
      } else if (value >= 1.66) {
        // Interpolate between orange and red for values between 1.66 and 5
        const factor = (value - 1.66) / (5 - 1.66); // 0 at value=1.66, 1 at value=5
        return interpolateColor(orange, red, factor);
      } else if (value > 0) {
        // Interpolate between white and orange for values between 0 and 1.66
        const factor = value / 1.66; // 0 at value=0, 1 at value=1.66
        return interpolateColor(grey, orange, factor);
      } else {
        return `rgb(${grey[0]}, ${grey[1]}, ${grey[2]})`;
      }

    case "ordinal": // Scale 3: Ordinal scale with discrete colors
      if (value >= 2) {
        return `rgb(${green[0]}, ${green[1]}, ${green[2]})`;
      } else if (value >= 1) {
        return `rgb(${lightGreen[0]}, ${lightGreen[1]}, ${lightGreen[2]})`;
      } else if (value <= -2) {
        return `rgb(${red[0]}, ${red[1]}, ${red[2]})`;
      } else if (value <= -1) {
        return `rgb(${orange[0]}, ${orange[1]}, ${orange[2]})`;
      } else {
        return `rgb(${grey[0]}, ${grey[1]}, ${grey[2]})`;
      }

    default:
      // Type safety
      const exhaustiveCheck: never = scaleType;
      throw new Error(`Unhandled scale type: ${exhaustiveCheck}`);
  }
};

const paTitle = ""; // "#### Fysieke agressie\n\n";
const npaTitle = ""; // "#### Niet-fysieke agressie\n\n";

const addTitleAndDescToFactor = (factor: Factor): Factor => {
  const { key, score } = factor;
  const [physAgres, nonPhysAgres] = score;
  const explanation = explanations[key];
  const {
    title,
    physical: explP,
    nonPhysical: explNP = explP,
    questions,
    missingData,
  } = explanation;
  let descPA: string;
  let descNPA: string;
  let actPA: string;
  let actNPA: string;
  let colors: [string, string];
  let moreIsBetter = ![
    "agressionResidentsView",
    "agressionStaffsView",
    "victim",
    "ptsd",
    "depression",
  ].includes(key);
  switch (key) {
    case "agressionResidentsView": {
      descPA =
        physAgres <= -2
          ? explP.expLowest
          : physAgres < -1
          ? explP.expLow
          : physAgres >= 1.1
          ? explP.expHigh
          : explP.expAvg;
      actPA =
        physAgres <= -1
          ? explP.actLowScore
          : physAgres >= 1.1
          ? explP.actHighScore
          : "";
      descNPA =
        nonPhysAgres <= -2
          ? explNP.expLowest
          : nonPhysAgres < -1
          ? explNP.expLow
          : nonPhysAgres >= 2
          ? explNP.expHighest
          : nonPhysAgres >= 1.66
          ? explNP.expHigh
          : explNP.expAvg;
      actNPA =
        nonPhysAgres < -1
          ? explNP.actLowScore
          : nonPhysAgres >= 1.66
          ? explNP.actHighScore
          : nonPhysAgres >= 1
          ? explNP.actLowScore
          : "";
      colors = [
        getColorForValue("pa", physAgres),
        getColorForValue("npa", nonPhysAgres),
      ];
      break;
    }
    case "agressionStaffsView": {
      descPA =
        physAgres <= -2
          ? explP.expLowest
          : physAgres < -1
          ? explP.expLow
          : physAgres >= 1.1
          ? explP.expHigh
          : explP.expAvg;
      actPA =
        physAgres <= -1
          ? explP.actLowScore
          : physAgres >= 1.1
          ? explP.actHighScore
          : "";
      descNPA =
        nonPhysAgres <= -2
          ? explNP.expLowest
          : nonPhysAgres < -1
          ? explNP.expLow
          : nonPhysAgres >= 2
          ? explNP.expHighest
          : nonPhysAgres >= 1.66
          ? explNP.expHigh
          : explNP.expAvg;
      actNPA =
        nonPhysAgres <= -1
          ? explNP.actLowScore
          : nonPhysAgres >= 1.66
          ? explNP.actHighScore
          : nonPhysAgres >= 1
          ? explNP.actLowScore
          : "";
      colors = [
        getColorForValue("pa", physAgres),
        getColorForValue("npa", nonPhysAgres),
      ];
      break;
    }
    default: {
      descPA =
        physAgres <= -2
          ? explP.expLowest
          : physAgres < -1
          ? explP.expLow
          : physAgres >= 2
          ? explP.expHighest
          : physAgres >= 1
          ? explP.expHigh
          : explP.expAvg;
      actPA =
        physAgres <= -1
          ? explP.actLowScore
          : physAgres >= 1
          ? explP.actHighScore
          : "";
      descNPA =
        nonPhysAgres <= -2
          ? explNP.expLowest
          : nonPhysAgres < -1
          ? explNP.expLow
          : nonPhysAgres >= 2
          ? explNP.expHighest
          : nonPhysAgres >= 1
          ? explNP.expHigh
          : explNP.expAvg;
      actNPA =
        nonPhysAgres <= -1
          ? explNP.actLowScore
          : nonPhysAgres >= 1
          ? explNP.actHighScore
          : "";
      colors = [
        getColorForValue("ordinal", moreIsBetter ? physAgres : -physAgres),
        getColorForValue(
          "ordinal",
          moreIsBetter ? nonPhysAgres : -nonPhysAgres
        ),
      ];
      break;
    }
  }
  return {
    ...factor,
    moreIsBetter,
    score,
    title,
    questions,
    missingData,
    desc:
      descPA === descNPA || !descNPA
        ? [descPA, ""]
        : [
            descPA ? paTitle + descPA : undefined,
            descNPA ? npaTitle + descNPA : undefined,
          ],
    activity:
      actPA === actNPA || !actNPA
        ? [actPA, ""]
        : [
            actPA ? paTitle + actPA : undefined,
            actNPA ? npaTitle + actNPA : undefined,
          ],
    colors,
  } as Factor;
};

export const userEntryToScore = (entry: UserEntry): UserScore => {
  const {
    respondentId,
    uniqueCode,
    date,
    questionCnt,
    answeredCnt,
    declinedCnt,
    // Questions
    nicePersonnel = 0,
    honestRules = 0,
    nicePeople = 0,
    caringPeople = 0,
    closeness = 0,
    dignity = 0,
    supportiveOfNeeds = 0,
    heard = 0,
    appreciated = 0,
    upset = 0,
    flashbacks = 0,
    anxiety = 0,
    down = 0,
    sleepDifficulty = 0,
    irritated = 0,
    niceActivities = 0,
    concentration = 0,
    avoidContact = 0,
    victimOfViolence = 0,
    physicalViolenceUsed = 0,
    lifeMeaningful = 0,
    senseOfPurpose = 0,
    meaningfulActivities = 0,
    // violenceNeverAcceptable = 0, // Negative trait
    // acceptableViolenceSituations = 0,
    // selfDefenseAllowed = 0,
    // drugUseForMood = 0,
    // sleepOrMedicationForMood = 0,
    // alcoholUseForMood = 0,
    freqPhysViol = 0,
    // selfOccupancy = 0,
    // sufficientActivities = 0,
    // dailyVariation = 0,
    fairTreatment = 0,
    influence = 0,
    // coerceOthers = 0,
    // rigidWaysOfDoingThings = 0,
    // ordersOthersToFollowMe = 0,
    rude = 0,
    forgiving = 0,
    kind = 0,
    // controlOverAnger = 0,
    // perceivedAsImpulsive = 0, // Negative trait
    // dominatedByAnger = 0, // Negative trait
    threatening = 0,
    insulting = 0,
    deceptive = 0,
    freqThreatBL = 0,
    freqInsults = 0,
    freqDecept = 0,
  } = entry;

  const avgSignificance = avg(
    lifeMeaningful,
    senseOfPurpose,
    meaningfulActivities
  );
  const avgFairness = avg(fairTreatment, influence, honestRules);
  const avgRelatedness = avg(
    nicePersonnel,
    nicePeople,
    caringPeople,
    closeness
  );
  const avgAppreciation = avg(dignity, supportiveOfNeeds, heard, appreciated);
  const avgPtsdReexp = avg(upset, flashbacks, anxiety);
  const avgDepressArousal = avg(
    down,
    sleepDifficulty,
    irritated,
    invertAnswer(niceActivities),
    invertAnswer(concentration),
    avoidContact
  );
  const avgVictim = avg(victimOfViolence);
  const avgKindness = avg(invertAnswer(rude), forgiving, kind);

  const avgPhysAgressResidentsView = avg(freqPhysViol);
  const avgNonPhysAgressResidentsView = avg(threatening, insulting, deceptive);
  const avgPhysAgressStaffsView = avg(physicalViolenceUsed);
  const avgNonPhysAgressStaffsView = avg(freqThreatBL, freqInsults, freqDecept);

  const agressionResidentsView = addTitleAndDescToFactor({
    key: "agressionResidentsView",
    score: [avgPhysAgressResidentsView[0], avgNonPhysAgressResidentsView[0]],
    category: categories.agression,
    notAnsweredPerc:
      (avgPhysAgressResidentsView[1] + avgNonPhysAgressResidentsView[1]) / 2,
    svg: agressionIcon,
  } as Factor);

  const agressionStaffsView = addTitleAndDescToFactor({
    key: "agressionStaffsView",
    score: [avgPhysAgressStaffsView[0], avgNonPhysAgressStaffsView[0]],
    category: categories.agression,
    notAnsweredPerc:
      (avgPhysAgressStaffsView[1] + avgNonPhysAgressStaffsView[1]) / 2,
    svg: observeAgressionIcon,
  } as Factor);

  const ptsd = addTitleAndDescToFactor({
    key: "ptsd",
    score: [
      modZ(avgPtsdReexp[0], 2.67, 0.67),
      modZ(avgPtsdReexp[0], 2.67, 0.67),
    ],
    category: categories.stress,
    notAnsweredPerc: avgPtsdReexp[1],
    svg: ptsdIcon,
  } as Factor);

  const victim = addTitleAndDescToFactor({
    key: "victim",
    score: [modZ(avgVictim[0], 2.5, 1.5), modZ(avgVictim[0], 2.0, 1.0)], // Note: scores are different
    category: categories.stress,
    notAnsweredPerc: avgVictim[1],
    svg: victimIcon,
  } as Factor);

  const depression = addTitleAndDescToFactor({
    key: "depression",
    score: [
      modZ(avgDepressArousal[0], 2.4, 0.6),
      modZ(avgDepressArousal[0], 2.4, 0.6),
    ],
    category: categories.stress,
    notAnsweredPerc: avgDepressArousal[1],
    svg: depressionIcon,
  } as Factor);

  const meaning = addTitleAndDescToFactor({
    key: "meaning",
    score: [
      modZ(avgSignificance[0], 4.0, 1.0),
      modZ(avgSignificance[0], 4.0, 1.0),
    ],
    category: categories.needs,
    notAnsweredPerc: avgSignificance[1],
    svg: meaningIcon,
  } as Factor);

  const honesty = addTitleAndDescToFactor({
    key: "honesty",
    score: [modZ(avgFairness[0], 3.67, 1.0), modZ(avgFairness[0], 3.67, 1.0)],
    category: categories.needs,
    notAnsweredPerc: avgFairness[1],
    svg: honestyIcon,
  } as Factor);

  const connection = addTitleAndDescToFactor({
    key: "connection",
    score: [
      modZ(avgRelatedness[0], 3.33, 0.67),
      modZ(avgRelatedness[0], 3.33, 0.67),
    ],
    category: categories.needs,
    notAnsweredPerc: avgRelatedness[1],
    svg: connectionIcon,
  } as Factor);

  const appreciation = addTitleAndDescToFactor({
    key: "appreciation",
    score: [modZ(avgAppreciation[0], 4, 1), modZ(avgAppreciation[0], 4, 1)],
    category: categories.needs,
    notAnsweredPerc: avgAppreciation[1],
    svg: appreciationIcon,
  } as Factor);

  const kindness = addTitleAndDescToFactor({
    key: "kindness",
    score: [modZ(avgKindness[0], 4.67, 0.33), modZ(avgKindness[0], 4.67, 0.33)],
    category: categories.personality,
    notAnsweredPerc: avgKindness[1],
    svg: kindnessIcon,
  } as Factor);

  return {
    respondentId,
    uniqueCode,
    date,
    questionCnt,
    answeredCnt,
    declinedCnt,
    // avgSignificance,
    // avgFairness,
    // avgRelatedness,
    // avgAppreciation,
    // avgPtsdReexp,
    // avgDepressArousal,
    // avgVictim,
    // avgAgreeable,
    // avgPhysAgressResidentsView,
    // avgNonPhysAgressResidentsView,
    // avgPhysAgressStaffsView,
    // avgNonPhysAgressStaffsView,
    agressionResidentsView,
    agressionStaffsView,
    meaning,
    honesty,
    connection,
    appreciation,
    ptsd,
    victim,
    kindness,
    depression,
  } as UserScore;
};

// Mapping for answer conversion: Nooit	Soms	Regelmatig	Vaak	Altijd	Zeg ik liever niet
const answerScale: Record<string, LikertScale> = {
  "zeg ik liever niet": 0,
  nooit: 1,
  soms: 2,
  regelmatig: 3,
  vaak: 4,
  altijd: 5,
};

const scaleToAnswerText = Object.entries(answerScale).reduce((acc, [s, n]) => {
  acc.set(n, s);
  acc.set(n.toString(), s);
  return acc;
}, new Map<number | string, string>());

export const likertToText = (scale: LikertScale) => {
  const found = scaleToAnswerText.get(scale);
  // console.log(scale, found);
  return found ? found : "-";
};

export const scaleToAnswer = Object.entries(answerScale).reduce(
  (acc, [s, n]) => {
    acc.set(n, capitalizeFirstLetter(s));
    return acc;
  },
  new Map<number, string>()
);

export async function processCSV(file: File): Promise<UserEntry[]> {
  // Function to transform headers using the mapping
  function transformHeader(originalHeader: string): keyof UserEntry {
    return (
      headerMapping[originalHeader.substring(0, 45).toLowerCase()] ||
      originalHeader
    );
  }

  function determineRespondentType(
    row: Record<string, string | number>
  ): RespondentType {
    const respondentType = row["respondentType"] as string;
    if (respondentType) return parseInt(respondentType) as RespondentType;
    if (row["respondentType"] === "interviewer") {
      return RespondentType.INTERVIEWER;
    }
    if (
      typeof row[interviewQuestionnaire.lifeMeaningful as string] !==
      "undefined"
    ) {
      return RespondentType.INTERVIEWER;
    }
    if (typeof row[questionnaire.lifeMeaningful as string] !== "undefined") {
      return RespondentType.USER;
    }
    return RespondentType.STAFF;
  }

  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, string | number>>(file, {
      header: true,
      delimiter: ";",
      skipEmptyLines: true,
      complete: (results) => {
        // Process the data
        const processedData: UserEntry[] = results.data.map((row) => {
          let date = Date.now();
          let startDate = row["Start datum"] as string;
          console.log(startDate);
          try {
            const d = convertDDMMYYYYToDate(startDate);
            if (d) {
              date = d.valueOf();
            }
          } catch {
            console.error("Invalid date", startDate);
          }
          const entry = {
            respondentType: determineRespondentType(row),
            date,
            questionCnt: 0,
            answeredCnt: 0,
            declinedCnt: 0,
          } as UserEntry;

          // Transform question answers
          Object.entries(row).forEach(([originalHeader, value]) => {
            const questionId = transformHeader(originalHeader);
            const answerText =
              typeof value === "string"
                ? (value as string).toLowerCase().trim()
                : undefined;
            const answer =
              answerText && answerScale.hasOwnProperty(answerText)
                ? answerScale[answerText]
                : value;
            entry.questionCnt!++;
            if (answer === 0) {
              entry.answeredCnt!++;
              entry.declinedCnt!++;
            } else if (answer) {
              entry.answeredCnt!++;
            }
            (entry[questionId] as unknown) = answer;
          });
          return entry;
        });

        resolve(processedData);
      },
      error: (error) => reject(error),
    });
  });
}

const mergeEntries = (
  entries: UserEntry[],
  newEntry: UserEntry
): UserEntry[] => {
  if (!newEntry.uniqueCode) {
    console.error("New entry does not have a unique code");
    return entries;
  }
  // Check if the new entry already exists in the list
  const existingEntryIndex = entries.findIndex(
    (entry) => entry.uniqueCode === newEntry.uniqueCode
  );
  if (existingEntryIndex !== -1) {
    // Merge the new entry with the existing one
    const existingEntry = entries[existingEntryIndex];
    if (
      existingEntry.respondentType === RespondentType.INTERVIEWER &&
      newEntry.respondentType === RespondentType.USER
    ) {
      // Ignore a user entry if the user did not finish his questionnaire and later did an interview.
      console.log("Ignoring user entry because it was not finished");
      console.log("Existing entry:", existingEntry);
      console.log("New entry:", newEntry);
      return entries;
    }
    // If the respondents are the same, merge the entries
    const date = Math.max(existingEntry.date!, newEntry.date!);
    const respondentType = Math.min(
      existingEntry.respondentType || 1,
      newEntry.respondentType || 1
    );
    const mergedEntry = {
      ...newEntry,
      ...existingEntry,
      ...newEntry,
      date,
      respondentType,
      questionCnt:
        (existingEntry.questionCnt || 0) + (newEntry.questionCnt || 0),
      answeredCnt:
        (existingEntry.answeredCnt || 0) + (newEntry.answeredCnt || 0),
      declinedCnt:
        (existingEntry.declinedCnt || 0) + (newEntry.declinedCnt || 0),
    };
    entries[existingEntryIndex] = mergedEntry;
  } else {
    // Add the new entry to the list
    entries.push(newEntry);
  }
  return entries;
};

export const handleCsvUpload =
  (
    saveModel: (model: DataModel) => void,
    model = {
      version: 0,
      lastUpdate: Date.now(),
      data: [],
    } as DataModel
  ) =>
  async (e: Event) => {
    const fileInput = e.target as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length <= 0) return;

    model.version++;
    model.lastUpdate = Date.now();

    const csv = await processCSV(fileInput.files[0]);
    const existingData = model.data || [];
    model.data =
      existingData.length === 0
        ? csv
        : csv.reduce((acc, entry) => mergeEntries(acc, entry), existingData);
    saveModel(model);
  };
