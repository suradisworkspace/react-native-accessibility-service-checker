import { NativeEventEmitter } from 'react-native';
import AccessibilityServiceChecker from './NativeAccessibilityServiceChecker';

export enum FEEDBACK_TYPE {
  FEEDBACK_ALL_MASK = -1,
  FEEDBACK_AUDIBLE = 4,
  FEEDBACK_BRAILLE = 32,
  FEEDBACK_GENERIC = 16,
  FEEDBACK_HAPTIC = 2,
  FEEDBACK_SPOKEN = 1,
  FEEDBACK_VISUAL = 8,
}

export type AccessibilityServiceType = {
  id: string;
  eventTypes: string;
  capabilities: string;
  description: null | string;
  flag: null | string;
};
const getInstalledService = (): AccessibilityServiceType[] => {
  return AccessibilityServiceChecker.getInstalledServices() as AccessibilityServiceType[];
};

const getEnabledServices = (
  feedBackType: FEEDBACK_TYPE = FEEDBACK_TYPE.FEEDBACK_ALL_MASK
) => {
  return AccessibilityServiceChecker.getEnabledServices(
    feedBackType
  ) as AccessibilityServiceType[];
};

const eventEmitter = new NativeEventEmitter(AccessibilityServiceChecker);

const addListener = (callback: (value: boolean) => void | undefined) => {
  return eventEmitter.addListener('RNASC_Listener', callback);
};

export default {
  getInstalledService,
  getEnabledServices,
  addListener,
};
