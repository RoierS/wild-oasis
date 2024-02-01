import { ChangeEvent } from 'react';

import { useForm } from 'react-hook-form';

import toast from 'react-hot-toast';

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

  const {
    register,
    formState: { errors },
  } = useForm<ISettings>({
    mode: 'onChange',
  });

  const handleUpdateSettings = (e: ChangeEvent<HTMLInputElement>) => {
    updateExistSettings({ [e.target.id]: e.target.value });
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
          disabled={isUpdating}
          defaultValue={Number(settings?.minBookingLength)}
          {...register('minBookingLength')}
          onBlur={handleUpdateSettings}
        />
      </FormRow>
      <FormRow
        labelName="Maximum nights/booking"
        errorMessage={errors.maxBookingLength?.message}
      >
        <Input
          type="number"
          id="maxBookingLength"
          disabled={isUpdating}
          defaultValue={Number(settings?.maxBookingLength)}
          {...register('maxBookingLength')}
          onBlur={handleUpdateSettings}
        />
      </FormRow>
      <FormRow
        labelName="Maximum guests/booking"
        errorMessage={errors.maxGuestsPerBooking?.message}
      >
        <Input
          type="number"
          id="maxGuestsPerBooking"
          disabled={isUpdating}
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
          disabled={isUpdating}
          defaultValue={Number(settings?.breakfastPrice)}
          {...register('breakfastPrice')}
          onBlur={handleUpdateSettings}
        />
      </FormRow>
    </Form>
  );
};

export default UpdateSettingsForm;
