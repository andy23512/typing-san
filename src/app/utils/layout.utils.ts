import { ACTIONS } from '../data/actions';
import {
  CharaChorderOneCharacterKey,
  CharaChorderOneCharacterKeyWithPositionCodesAndScore,
  CharaChorderOneLayer,
  CharacterDeviceKey,
  DeviceLayout,
} from '../models/device-layout.models';
import {
  HighlightSetting,
  PreferSides,
} from '../models/highlight-setting.models';
import {
  CharacterActionCode,
  CharacterKeyCode,
  CharacterKeyCodeMap,
  KeyBoardLayout,
  KeyboardLayoutKey,
} from '../models/keyboard-layout.models';
import { WritingSystemKeyCode } from '../models/writing-system-key-code.models';

export function convertKeyboardLayoutToCharacterKeyCodeMap(
  keyboardLayout: KeyBoardLayout | null,
): CharacterKeyCodeMap {
  if (!keyboardLayout) {
    return new Map();
  }
  return new Map(
    (
      Object.entries(keyboardLayout.layout) as [
        WritingSystemKeyCode,
        Partial<KeyboardLayoutKey>,
      ][]
    )
      .map(([keyCode, keyboardLayoutKey]) =>
        keyboardLayoutKey
          ? (
              Object.entries(keyboardLayoutKey) as [
                keyof KeyboardLayoutKey,
                string,
              ][]
            ).map(
              ([modifier, character]) =>
                [
                  character,
                  {
                    keyCode,
                    shiftKey:
                      modifier === 'withShift' ||
                      modifier === 'withShiftAltGraph',
                    altGraphKey:
                      modifier === 'withAltGraph' ||
                      modifier === 'withShiftAltGraph',
                  },
                ] as const,
            )
          : [],
      )
      .flat(),
  );
}

export function getCharacterKeyCodeFromCharacter(
  character: string,
  characterKeyCodeMap: CharacterKeyCodeMap,
) {
  return characterKeyCodeMap.get(character);
}

export function getCharacterActionCodeFromCharacterKeyCode({
  keyCode,
  shiftKey,
  altGraphKey,
}: CharacterKeyCode) {
  const action = ACTIONS.find((a) => a.writingSystemKeyCode === keyCode);
  if (!action) {
    return null;
  }
  return {
    actionCode: action.codeId,
    shiftKey,
    altGraphKey,
  };
}

export function getCharacterDeviceKeysFromActionCode(
  { actionCode, shiftKey, altGraphKey }: CharacterActionCode,
  deviceLayout: DeviceLayout | null,
): CharacterDeviceKey[] | null {
  if (!deviceLayout) {
    return null;
  }
  return deviceLayout.layout
    .map((layer, layerIndex) => {
      const positionCodesList = layer
        .map((ac, index) => (ac === actionCode ? index : -1))
        .filter((pos) => pos !== -1)
        .map((pos) => {
          let layer = CharaChorderOneLayer.Primary;
          if (layerIndex === 1) {
            layer = CharaChorderOneLayer.Secondary;
          } else if (layerIndex === 2) {
            layer = CharaChorderOneLayer.Tertiary;
          }
          return {
            device: 'CharaChorderOne' as const,
            characterKeyPositionCode: pos,
            layer,
            shiftKey,
            altGraphKey,
          };
        });
      if (positionCodesList.length === 0) {
        return null;
      }
      return positionCodesList;
    })
    .filter(Boolean)[0];
}

export function getPositionSide(positionCode: number) {
  return positionCode < 45 ? 'left' : 'right';
}

export function isPositionAtSide(positionCode: number, side: 'left' | 'right') {
  return getPositionSide(positionCode) === side;
}

export function meetPreferSides(
  positionCode1: number,
  positionCode2: number,
  preferSides: PreferSides,
) {
  if (preferSides === 'both') {
    return getPositionSide(positionCode1) !== getPositionSide(positionCode2);
  } else {
    return getPositionSide(positionCode1) === getPositionSide(positionCode2);
  }
}

export function humanizePositionCode(positionCode: number) {
  const hand = positionCode < 45 ? 'Left' : 'Right';
  const sw = [
    'Thumb Back',
    'Thumb Middle',
    'Thumb Front',
    'Index',
    'Middle',
    'Ring',
    'Pinky',
    'Middle Secondary',
    'Ring Secondary',
  ][Math.floor((positionCode % 45) / 5)];
  const direction = (
    hand === 'Left'
      ? ['Down (Press)', 'East', 'North', 'West', 'South']
      : ['Down (Press)', 'West', 'North', 'East', 'South']
  )[positionCode % 5];
  return [hand, sw, direction].join(' ');
}

export function getHighlightPositionCodesFromCharacterDeviceKeys(
  characterDeviceKeys: CharaChorderOneCharacterKey[],
  modifierKeyPositionCodeMap: {
    shift: number[];
    numShift: number[];
    fnShift: number[];
    altGraph: number[];
  },
  highlightSetting: HighlightSetting,
) {
  return characterDeviceKeys
    .map((k) => {
      const result: CharaChorderOneCharacterKeyWithPositionCodesAndScore[] = [];
      if (k.shiftKey) {
        if (k.layer === CharaChorderOneLayer.Secondary) {
          const { preferCharacterKeySide, preferShiftSide } =
            highlightSetting.shiftAndNumShiftLayer;
          for (const shiftPositionCode of modifierKeyPositionCodeMap.shift) {
            for (const numShiftPositionCode of modifierKeyPositionCodeMap.numShift) {
              let score = 0;
              if (
                isPositionAtSide(
                  k.characterKeyPositionCode,
                  preferCharacterKeySide,
                )
              ) {
                score += 1;
              }
              if (isPositionAtSide(shiftPositionCode, preferShiftSide)) {
                score += 1;
              }
              if (!isPositionAtSide(numShiftPositionCode, preferShiftSide)) {
                score += 1;
              }
              result.push({
                ...k,
                positionCodes: [
                  k.characterKeyPositionCode,
                  shiftPositionCode,
                  numShiftPositionCode,
                ],
                score,
              });
            }
          }
        } else {
          const { preferShiftSide, preferSides } = highlightSetting.shiftLayer;
          for (const shiftPositionCode of modifierKeyPositionCodeMap.shift) {
            let score = 0;
            if (
              meetPreferSides(
                k.characterKeyPositionCode,
                shiftPositionCode,
                preferSides,
              )
            ) {
              score += 2;
            }
            if (isPositionAtSide(shiftPositionCode, preferShiftSide)) {
              score += 1;
            }
            result.push({
              ...k,
              positionCodes: [k.characterKeyPositionCode, shiftPositionCode],
              score,
            });
          }
        }
      } else {
        if (k.layer === CharaChorderOneLayer.Secondary) {
          const { preferNumShiftSide, preferSides } =
            highlightSetting.numShiftLayer;
          for (const numShiftPositionCode of modifierKeyPositionCodeMap.numShift) {
            let score = 0;
            if (
              meetPreferSides(
                k.characterKeyPositionCode,
                numShiftPositionCode,
                preferSides,
              )
            ) {
              score += 2;
            }
            if (isPositionAtSide(numShiftPositionCode, preferNumShiftSide)) {
              score += 1;
            }
            result.push({
              ...k,
              positionCodes: [k.characterKeyPositionCode, numShiftPositionCode],
              score,
            });
          }
        } else {
          result.push({
            ...k,
            positionCodes: [k.characterKeyPositionCode],
            score: 0,
          });
        }
      }
      return result;
    })
    .flat()
    .sort((a, b) => {
      if (a.positionCodes.length === b.positionCodes.length) {
        return b.score - a.score;
      }
      return a.positionCodes.length - b.positionCodes.length;
    })[0];
}
