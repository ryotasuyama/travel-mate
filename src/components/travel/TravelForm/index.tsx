// src/components/travel/TravelForm/index.tsx
import React, { useState } from 'react';
import { TravelFormInput, TravelPlan } from '@/types/travel';
import { FormState } from './types';
import { RequiredSection } from './RequiredSection';
import { OptionalSection } from './OptionalSection';

interface TravelFormProps {
 onPlanGenerated: (plan: TravelPlan) => void;
}

const initialFormState: TravelFormInput = {
 departure: '',
 gender: 'male',
 group: {
   adults: 1,
   children: 0
 },
 duration: {
   nights: 1,
   days: 2
 },
 transportation: 'public',
 accommodation: 'hotel'
};

const TravelForm: React.FC<TravelFormProps> = ({ onPlanGenerated }) => {
 const [formState, setFormState] = useState<FormState>({
   isSubmitting: false,
   error: null,
   submitted: false
 });

 const [formData, setFormData] = useState<TravelFormInput>(initialFormState);

 // バリデーション処理
 const validateForm = (): boolean => {
   // 必須項目のチェック
   const requiredFields = [
     formData.departure,        // 出発地
     formData.gender,          // 性別
     formData.group.adults,    // 大人の人数
     formData.duration.nights, // 泊数
     formData.transportation,  // 交通手段
     formData.accommodation,   // 宿泊施設タイプ
   ];

   const isValid = requiredFields.every(field => 
     field !== undefined && field !== '' && field !== 0
   );

   if (!isValid) {
     setFormState(prev => ({
       ...prev,
       error: '必須項目が入力されていません'
     }));
   }

   return isValid;
 };

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   setFormState({ isSubmitting: false, error: null, submitted: false });

   // フォームのバリデーション
   if (!validateForm()) {
     return;
   }

   setFormState(prev => ({ ...prev, isSubmitting: true }));

   try {
     const response = await fetch('/api/travel', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(formData),
     });

     const data = await response.json();
     
     if (!response.ok) {
       throw new Error(data.error?.message || '予期せぬエラーが発生しました');
     }

     setFormState({
       isSubmitting: false,
       error: null,
       submitted: true
     });

     // 生成されたプランを親コンポーネントに渡す
     onPlanGenerated(data);

   } catch (error) {
     setFormState({
       isSubmitting: false,
       error: error instanceof Error ? error.message : '予期せぬエラーが発生しました',
       submitted: false
     });
   }
 };

 const handleFormUpdate = (updates: Partial<TravelFormInput>) => {
   setFormData(prev => ({
     ...prev,
     ...updates
   }));
   // エラーメッセージをクリア
   if (formState.error) {
     setFormState(prev => ({ ...prev, error: null }));
   }
 };

 return (
   <div className="min-h-screen bg-emerald-50">
     <div className="max-w-4xl mx-auto p-6">
       <div className="bg-white rounded-lg shadow-md p-6">
         <div className="text-center mb-8">
           <h1 className="text-3xl font-bold text-slate-700">トラベルメイト</h1>
           <p className="text-slate-500 mt-2">あなたの旅行プランをAIがサポートします</p>
         </div>

         <form onSubmit={handleSubmit} className="space-y-8">
           {/* エラーメッセージ */}
           {formState.error && (
             <div className="bg-red-50 text-red-600 p-4 rounded-md" role="alert">
               <p className="text-center font-medium">{formState.error}</p>
             </div>
           )}

           <RequiredSection 
             formData={formData}
             onUpdate={handleFormUpdate}
           />

           <OptionalSection
             formData={formData}
             onUpdate={handleFormUpdate}
           />

           <div className="flex justify-center pt-4">
             <button
               type="submit"
               disabled={formState.isSubmitting}
               className="w-full max-w-md bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
               aria-label={formState.isSubmitting ? "プラン生成中..." : "プランを生成する"}
             >
               {formState.isSubmitting ? (
                 <div className="flex items-center justify-center">
                   <svg 
                     className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                     xmlns="http://www.w3.org/2000/svg" 
                     fill="none" 
                     viewBox="0 0 24 24"
                   >
                     <circle 
                       className="opacity-25" 
                       cx="12" 
                       cy="12" 
                       r="10" 
                       stroke="currentColor" 
                       strokeWidth="4"
                     />
                     <path 
                       className="opacity-75" 
                       fill="currentColor" 
                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                     />
                   </svg>
                   プラン生成中...
                 </div>
               ) : (
                 'プランを生成する'
               )}
             </button>
           </div>
         </form>
       </div>
     </div>
   </div>
 );
};

export default TravelForm;