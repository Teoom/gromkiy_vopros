import type {
  BookingFormSubmit,
  QuestBookingDay,
  QuestScheduleResposne
} from './types';

export const getQuestSchedule = async (): Promise<
  QuestBookingDay[] | { error: string }
> => {
  try {
    const response = await fetch(
      'https://api.questadmin.ru/integrations/getSchedule?id=69b13c41001da40829feec84'
    );

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    const schedule: QuestScheduleResposne = await response.json();

    return schedule.intervals;
  } catch (error) {
    return { error: 'Ошибка' };
  }
};

export const questBookingApi = async (data: BookingFormSubmit) => {
  try {
    const response = await fetch(
      'https://api.questadmin.ru/integrations/createVisit',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }
    );

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    return { status: response.status };
  } catch (error) {
    return { error: 'Ошибка' };
  }
};
