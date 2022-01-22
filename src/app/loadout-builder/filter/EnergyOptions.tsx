import { t } from 'app/i18next-t';
import clsx from 'clsx';
import React, { Dispatch, useMemo } from 'react';
import { LoadoutBuilderAction } from '../loadout-builder-reducer';
import { AssumeArmorMasterwork, LockArmorEnergyType } from '../types';
import styles from './EnergyOptions.m.scss';

interface RadioOption {
  label: string;
  selected: boolean;
  onClick(): void;
}

const RadioSetting = React.memo(function RadioSetting({
  label,
  options,
}: {
  label: string;
  options: RadioOption[];
}) {
  return (
    <div className={styles.settingGroup}>
      <div className={styles.title}>{label}</div>
      <div className={styles.buttons}>
        {options.map(({ label, selected, onClick }) => (
          <RadioOptionButton key={label} label={label} selected={selected} onClick={onClick} />
        ))}
      </div>
    </div>
  );
});

function RadioOptionButton({ label, selected, onClick }: RadioOption) {
  return (
    <button
      type="button"
      className={clsx('dim-button', styles.button, {
        selected,
      })}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default function EnergyOptions({
  assumeArmorMasterwork,
  lockArmorEnergyType,
  lbDispatch,
}: {
  assumeArmorMasterwork?: AssumeArmorMasterwork;
  lockArmorEnergyType?: LockArmorEnergyType;
  lbDispatch: Dispatch<LoadoutBuilderAction>;
}) {
  const lockEnergyOptions: RadioOption[] = useMemo(
    () => [
      {
        label: t('LoadoutBuilder.Masterworked'),
        selected: lockArmorEnergyType === LockArmorEnergyType.Masterworked,
        onClick: () => {
          lbDispatch({
            type: 'lockArmorEnergyTypeChanged',
            lockArmorEnergyType:
              lockArmorEnergyType !== LockArmorEnergyType.Masterworked
                ? LockArmorEnergyType.Masterworked
                : undefined,
          });
        },
      },
      {
        label: t('LoadoutBuilder.All'),
        selected: lockArmorEnergyType === LockArmorEnergyType.All,
        onClick: () => {
          lbDispatch({
            type: 'lockArmorEnergyTypeChanged',
            lockArmorEnergyType:
              lockArmorEnergyType !== LockArmorEnergyType.All ? LockArmorEnergyType.All : undefined,
          });
        },
      },
    ],
    [lbDispatch, lockArmorEnergyType]
  );

  const assumeMasterworkOptions: RadioOption[] = useMemo(
    () => [
      {
        label: t('LoadoutBuilder.Legendary'),
        selected: assumeArmorMasterwork === AssumeArmorMasterwork.Legendary,
        onClick: () => {
          lbDispatch({
            type: 'assumeArmorMasterworkChanged',
            assumeArmorMasterwork:
              assumeArmorMasterwork !== AssumeArmorMasterwork.Legendary
                ? AssumeArmorMasterwork.Legendary
                : undefined,
          });
        },
      },
      {
        label: t('LoadoutBuilder.All'),
        selected: assumeArmorMasterwork === AssumeArmorMasterwork.All,
        onClick: () => {
          lbDispatch({
            type: 'assumeArmorMasterworkChanged',
            assumeArmorMasterwork:
              assumeArmorMasterwork !== AssumeArmorMasterwork.All
                ? AssumeArmorMasterwork.All
                : undefined,
          });
        },
      },
    ],
    [assumeArmorMasterwork, lbDispatch]
  );

  return (
    <div className={styles.energyOptions}>
      <RadioSetting label={t('LoadoutBuilder.LockElement')} options={lockEnergyOptions} />
      <RadioSetting
        label={t('LoadoutBuilder.AssumeMasterwork')}
        options={assumeMasterworkOptions}
      />
    </div>
  );
}
