/* eslint-disable no-console */
import { useForm } from 'react-hook-form';

import toast from 'react-hot-toast';

import { useSettings } from '@/hooks/useSettings';
import { ISettings } from '@/types/settings';
import Button from '@/ui/Button/Button';
import Form from '@/ui/Form/Form';
import FormRow from '@/ui/FormRow/FormRow';
import Input from '@/ui/Input/Input';
import Spinner from '@/ui/Spinner/Spinner';

const UpdateSettingsForm = () => {
  const { isLoading, settings, error: loadingError } = useSettings();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISettings>({
    mode: 'onChange',
  });

  const onSubmit = (data: ISettings) => {
    console.log(data);
    console.log(settings);
  };

  if (isLoading) return <Spinner />;

  if (loadingError) toast.error(loadingError.message);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        labelName="Minimum nights/booking"
        errorMessage={errors?.minBookingLength?.message}
      >
        <Input
          type="number"
          id="minBookingLength"
          defaultValue={Number(settings?.minBookingLength)}
          {...register('minBookingLength')}
        />
      </FormRow>
      <FormRow
        labelName="Maximum nights/booking"
        errorMessage={errors.maxBookingLength?.message}
      >
        <Input
          type="number"
          id="maxBookingLength"
          defaultValue={Number(settings?.maxBookingLength)}
          {...register('maxBookingLength')}
        />
      </FormRow>
      <FormRow
        labelName="Maximum guests/booking"
        errorMessage={errors.maxGuestsPerBooking?.message}
      >
        <Input
          type="number"
          id="maxGuestsPerBooking"
          defaultValue={Number(settings?.maxGuestsPerBooking)}
          {...register('maxGuestsPerBooking')}
        />
      </FormRow>
      <FormRow
        labelName="Breakfast price"
        errorMessage={errors.breakfastPrice?.message}
      >
        <Input
          type="number"
          id="breakfastPrice"
          defaultValue={Number(settings?.breakfastPrice)}
          {...register('breakfastPrice')}
        />
      </FormRow>
      <Button $size="medium" $variation="secondary">
        Submit
      </Button>
    </Form>
  );
};

export default UpdateSettingsForm;
