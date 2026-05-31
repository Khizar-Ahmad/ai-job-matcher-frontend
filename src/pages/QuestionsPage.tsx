import { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MessageSquareText, Plus, Trash2, Sparkles, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { questionsSchema, type QuestionsFormData } from '@/validations/schemas';
import { useAnswerQuestions } from '@/hooks/useJobHooks';
import { Textarea } from '@/components/ui/Textarea';
import { FileUpload } from '@/components/ui/FileUpload';
import { Spinner } from '@/components/ui/Spinner';
import type { QuestionsResult } from '@/types';

const AnswerCard = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-4 text-left"
      >
        <p className="text-sm font-display font-600 text-white leading-snug">{question}</p>
        {open ? (
          <ChevronUp size={16} className="text-ink-400 shrink-0 mt-0.5" />
        ) : (
          <ChevronDown size={16} className="text-ink-400 shrink-0 mt-0.5" />
        )}
      </button>

      {open && (
        <div className="mt-4 pt-4 border-t border-surface-border">
          <p className="text-sm text-ink-200 font-body leading-relaxed whitespace-pre-wrap">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

export const QuestionsPage = () => {
  const [result, setResult] = useState<QuestionsResult | null>(null);

  const { submit, isPending } = useAnswerQuestions((data) => setResult(data));

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<QuestionsFormData>({
    resolver: yupResolver(questionsSchema),
    defaultValues: { questions: [''] },
  });

  const { fields, append, remove } = useFieldArray({
    // react-hook-form useFieldArray needs an object array, so we wrap strings
    control,
    // @ts-expect-error – yup schema uses string[], RHF field array needs object[]
    name: 'questions',
  });

  const onSubmit = (data: QuestionsFormData) => {
    submit({
      questions: (data.questions as string[]).filter(Boolean),
      resume: data.resume as File,
    });
  };

  const handleReset = () => {
    reset({ questions: [''] });
    setResult(null);
  };

  // Cast errors for the dynamic field array
  const qErrors = errors.questions as { message?: string }[] | undefined;

  return (
    <div className="space-y-8 animate-fade-up max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-700 text-3xl text-white">Answer Questions</h1>
          <p className="text-ink-400 text-sm mt-1 font-body">
            Paste the application questions from a job form and get tailored, polished answers.
          </p>
        </div>
        {result && (
          <button onClick={handleReset} className="btn-secondary">
            <RotateCcw size={14} /> New Session
          </button>
        )}
      </div>

      {/* Form */}
      {!result && (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="card space-y-6">
          {/* Dynamic question list */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="input-label mb-0">Application Questions</label>
              <span className="text-xs text-ink-500 font-mono">{fields.length} question{fields.length !== 1 ? 's' : ''}</span>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-start">
                <div className="flex-1">
                  <Textarea
                    placeholder={`Question ${index + 1}…`}
                    rows={2}
                    error={qErrors?.[index]?.message}
                    {...register(`questions.${index}` as const)}
                  />
                </div>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="mt-1 p-2 text-ink-400 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-colors"
                    title="Remove question"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            ))}

            {typeof errors.questions?.message === 'string' && (
              <p className="error-text">{errors.questions.message}</p>
            )}

            <button
              type="button"
              onClick={() => append('' as unknown as { id: string })}
              className="btn-ghost text-volt-400 hover:text-volt-300 hover:bg-volt-400/5 text-sm"
            >
              <Plus size={15} /> Add another question
            </button>
          </div>

          <div className="border-t border-surface-border" />

          {/* Resume upload */}
          <Controller
            name="resume"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FileUpload
                label="Your Resume"
                onChange={onChange}
                value={value as File | null}
                error={errors.resume?.message}
              />
            )}
          />

          <button type="submit" disabled={isPending} className="btn-primary w-full py-3">
            {isPending ? (
              <><Spinner size={16} /> Generating answers…</>
            ) : (
              <><Sparkles size={16} /> Generate Answers</>
            )}
          </button>
        </form>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-4 animate-fade-up">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquareText size={16} className="text-volt-400" />
            <p className="text-sm font-display font-600 text-white">
              {result.questions_and_answers.length} answer{result.questions_and_answers.length !== 1 ? 's' : ''} generated
            </p>
          </div>

          {result.questions_and_answers.map(({ question, answer }, i) => (
            <AnswerCard key={i} question={question} answer={answer} />
          ))}
        </div>
      )}
    </div>
  );
};
