import { ChangeEvent } from 'react';

import { useForm } from 'react-hook-form';

import toast from 'react-hot-toast';

import { yupResolver } from '@hookform/resolvers/yup';

import { schemaSettings } from '@/constants/schemaSettings';
import { useSettings } from '@/hooks/useSettings';
import { useUpdateSettings } from '@/hooks/useUpdateSettings';
import { ISettings } from '@/types/settings';
import Form from '@/ui/Form/Form';
import FormRow from '@/ui/FormRow/FormRow';
import Input from '@/ui/Input/Input';
import Spinner from '@/ui/Spinner/Spinner';

const UpdateSettingsForm = () => {
  const { isLoading, settings, error: loadingError } = useSettings();
  const { isUpdating, updateExistSettings } = useUpdateSettings();
  const isWorking = isLoading || isUpdating;

  const {
    register,
    formState: { errors },
    trigger,
    setValue,
  } = useForm<ISettings>({
    resolver: yupResolver(schemaSettings),
    mode: 'onChange',
  });

  const handleUpdateSettings = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value, defaultValue } = e.target;

    if (
      Number(value) <= 0 ||
      Object.keys(errors).length > 0 ||
      defaultValue === value
    )
      return;

    updateExistSettings({ [id]: Number(value) });

    // updating default value to prevent unneccesary settings update
    e.target.defaultValue = value;
  };

  if (isLoading) return <Spinner />;

  if (loadingError) toast.error(loadingError.message);

  return (
    <Form>
      <FormRow
        labelName="Minimum nights/booking"
        errorMessage={errors?.minBookingLength?.message}
      >
        <Input
          type="number"
          id="minBookingLength"
          disabled={isWorking}
          defaultValue={Number(settings?.minBookingLength)}
          {...register('minBookingLength')}
          onBlur={handleUpdateSettings}
          onChange={(e) => {
            setValue('minBookingLength', Number(e.target.value));
            trigger(['minBookingLength', 'maxBookingLength']);
          }}
        />
      </FormRow>
      <FormRow
        labelName="Maximum nights/booking"
        errorMessage={errors.maxBookingLength?.message}
      >
        <Input
          type="number"
          id="maxBookingLength"
          disabled={isWorking}
          defaultValue={Number(settings?.maxBookingLength)}
          {...register('maxBookingLength')}
          onBlur={handleUpdateSettings}
          onChange={(e) => {
            setValue('maxBookingLength', Number(e.target.value));
            trigger(['minBookingLength', 'maxBookingLength']);
          }}
        />
      </FormRow>
      <FormRow
        labelName="Maximum guests/booking"
        errorMessage={errors.maxGuestsPerBooking?.message}
      >
        <Input
          type="number"
          id="maxGuestsPerBooking"
          disabled={isWorking}
          defaultValue={Number(settings?.maxGuestsPerBooking)}
          {...register('maxGuestsPerBooking')}
          onBlur={handleUpdateSettings}
        />
      </FormRow>
      <FormRow
        labelName="Breakfast price"
        errorMessage={errors.breakfastPrice?.message}
      >
        <Input
          type="number"
          id="breakfastPrice"
          disabled={isWorking}
          defaultValue={Number(settings?.breakfastPrice)}
          {...register('breakfastPrice')}
          onBlur={handleUpdateSettings}
        />
      </FormRow>
    </Form>
  );
};

export default UpdateSettingsForm;
