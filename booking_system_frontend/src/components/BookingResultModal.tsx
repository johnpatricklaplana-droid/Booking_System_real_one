import { CalendarCheck, Clock, LucideCheckCircle2, Scissors, User2, X } from "lucide-react";
import type { ServiceResponse, Staff, Time } from "../interfaces/Types";

interface BookingResultProps {
    selectedTime: Time | null;
    selectedDate: Date;
    serviceDetails: ServiceResponse | null;
    selectedStaff: Staff | null;
    success: boolean | undefined;
    onClose: any;
}

export default function BookingResultModal ({
    selectedTime,
    selectedDate,
    serviceDetails,
    selectedStaff,
    success,
    onClose
}: Readonly<BookingResultProps>) {

    return (
        <div className={`p-4 z-50 flex w-[90%] lg:w-85 sm:w-85 ring-2 ${success ? 'ring-(--teal) bg-(--teal)/15' : 'ring-red-700 bg-red-900/15'} backdrop-blur-3xl items-center flex-col rounded-2xl fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`}>
            <button 
                className="flex w-full cursor-pointer justify-end text-(--text-2) pr-2 pt-2"
                onClick={onClose}
            >
                <X size={18} />
            </button>
            <div className="rounded-full shadow-(--teal)">
                <LucideCheckCircle2 color={success ? 'var(--teal)' : '#b91c1c'} size={64} />
            </div>
            <h1 className={`${success ? 'text-(--teal)' : 'text-red-700'} text-2xl`}>{success ? 'Booking Confirmed' : 'Booking Failed'}</h1>
            <p className="text-(--text-2) text-sm text-center mb-6 mt-2">{success ? 'your appointment has been successfully reserved.' : 'You already have an appointment scheduled during this time. Please choose a different time.'}</p>
            <div className={`w-full ring ${success ? 'ring-(--teal)' : 'ring-red-700'} p-4 rounded-sm`}>
                <div className="w-full gap-2 flex border-b-2 border-b-(--border) py-2">
                    <div className={`${success ? 'bg-(--teal)/15' : 'bg-red-600/15'} w-fit p-2 rounded-sm`}>
                        <Scissors color={success ? 'var(--teal)' : '#b91c1c'} size={24} />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="tracking-tight text-sm text-(--text-3) leading-2">Service</p>
                        <p className="text-(--text-1)">{serviceDetails?.serviceName}</p>
                    </div>
                </div>
                <div className="w-full gap-2 flex border-b-2 border-b-(--border) py-2">
                    <div className={`${success ? 'bg-(--teal)/15' : 'bg-red-600/15'} w-fit p-2 rounded-sm`}>
                        <User2 color={success ? 'var(--teal)' : '#b91c1c'} size={24} />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="tracking-tight text-sm text-(--text-3) leading-2">Service</p>
                        <p className="text-(--text-1)">{selectedStaff?.fullName ?? 'placeholder'}</p>
                    </div>
                </div>
                <div className="w-full gap-2 flex border-b-2 border-b-(--border) py-2">
                    <div className={`${success ? 'bg-(--teal)/15' : 'bg-red-600/15'} w-fit p-2 rounded-sm`}>
                        <CalendarCheck color={success ? 'var(--teal)' : '#b91c1c'} size={24} />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="tracking-tight text-sm text-(--text-3) leading-2">Service</p>
                        <p className="text-(--text-1)">{selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                    </div>
                </div>
                <div className="w-full gap-2 flex py-2">
                    <div className={`${success ? 'bg-(--teal)/15' : 'bg-red-600/15'} w-fit p-2 rounded-sm`}>
                        <Clock color={success ? 'var(--teal)' : '#b91c1c'} size={24} />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="tracking-tight text-sm text-(--text-3) leading-2">Service</p>
                        <p className="text-(--text-1)">{selectedTime?.value!}</p>
                    </div>
                </div>
            </div>
            <button 
                className={`mt-4 cursor-pointer hover:scale-105 transition ${success ? 'bg-(--teal) border-(--teal) text-(--text-1) font-medium' : 'bg-red-700/15 border-red-700 text-red-700'} px-4 text-sm font-medium py-2 rounded-sm border-2`}
                onClick={onClose}
            >{success ? 'Done' : 'Choose Another Time'}</button>
        </div>
    );

}