import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Sparkles, RotateCcw, Copy, Check } from "lucide-react";
import {
  jobProcessSchema,
  type JobProcessFormData,
} from "@/validations/schemas";
import { useProcessJob } from "@/hooks/useJobHooks";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { FileUpload } from "@/components/ui/FileUpload";
import { Spinner } from "@/components/ui/Spinner";
import { MatchScoreRing } from "@/components/ui/MatchScoreRing";
import { SkillTag } from "@/components/ui/SkillTag";
import type { JobProcessResult } from "@/types";

export const JobMatchPage = () => {
  const [result, setResult] = useState<JobProcessResult | null>(null);
  const [copied, setCopied] = useState(false);

  const { submit, isPending } = useProcessJob((data) => setResult(data));

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<JobProcessFormData>({
    resolver: yupResolver(jobProcessSchema),
  });

  const onSubmit = (data: JobProcessFormData) => {
    submit({
      company_name: data.company_name,
      job_title: data.job_title,
      job_description: data.job_description,
      requirements: data.requirements,
      resume: data.resume as File,
    });
  };

  const handleReset = () => {
    reset();
    setResult(null);
  };

  const copyCoverLetter = () => {
    if (!result?.cover_letter) return;
    navigator.clipboard.writeText(result.cover_letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Identify matched vs missing skills
  const resumeSkillsSet = new Set(
    result?.resume_skills.map((s) => s.toLowerCase()) ?? [],
  );
  const matchedSkills =
    result?.job_skills.filter((s) => resumeSkillsSet.has(s.toLowerCase())) ??
    [];
  const missingSkills =
    result?.job_skills.filter((s) => !resumeSkillsSet.has(s.toLowerCase())) ??
    [];

  return (
    <div className="space-y-8 animate-fade-up max-w-4xl">
      {/* Header */}
      {/* <div className="flex items-center justify-between"> */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display font-700 text-2xl sm:text-3xl text-white">
            Job Match Analysis
          </h1>
          <p className="text-ink-400 text-sm mt-1 font-body">
            Paste a job description to get your match score and a custom cover
            letter.
          </p>
        </div>
        {result && (
          <button onClick={handleReset} className="btn-secondary">
            <RotateCcw size={14} /> New Analysis
          </button>
        )}
      </div>

      {/* Form */}
      {!result && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="card space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Company Name"
              placeholder="e.g. Acme Corp"
              error={errors.company_name?.message}
              {...register("company_name")}
            />
            <Input
              label="Job Title"
              placeholder="e.g. Senior Backend Engineer"
              error={errors.job_title?.message}
              {...register("job_title")}
            />
          </div>

          <Textarea
            label="Job Description"
            placeholder="Paste the full job description here…"
            rows={6}
            error={errors.job_description?.message}
            {...register("job_description")}
          />

          <Textarea
            label="Requirements"
            placeholder="Paste the requirements / qualifications section…"
            rows={4}
            error={errors.requirements?.message}
            {...register("requirements")}
          />

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

          <button
            type="submit"
            disabled={isPending}
            className="btn-primary w-full py-3"
          >
            {isPending ? (
              <>
                <Spinner size={16} /> Analysing with AI…
              </>
            ) : (
              <>
                <Sparkles size={16} /> Analyse Job Match
              </>
            )}
          </button>
        </form>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-6 animate-fade-up">
          {/* Score + skill split */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Ring */}
            {/* <div className="card flex flex-col items-center justify-center py-8"> */}
            <div className="card flex flex-col items-center justify-center py-5 sm:py-8">

              <MatchScoreRing percentage={result.match_percentage} />
              <p className="text-ink-400 text-xs mt-3 font-mono text-center">
                Overall compatibility
              </p>
            </div>

            {/* Matched skills */}
            <div className="card">
              <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
                ✓ Matched Skills ({matchedSkills.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {matchedSkills.length > 0 ? (
                  matchedSkills.map((s) => (
                    <SkillTag key={s} label={s} variant="match" />
                  ))
                ) : (
                  <p className="text-ink-400 text-xs">None matched</p>
                )}
              </div>
            </div>

            {/* Missing skills */}
            <div className="card">
              <p className="text-xs font-mono text-red-400 uppercase tracking-widest mb-3">
                ✗ Gaps ({missingSkills.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {missingSkills.length > 0 ? (
                  missingSkills.map((s) => (
                    <SkillTag key={s} label={s} variant="missing" />
                  ))
                ) : (
                  <p className="text-ink-400 text-xs">No gaps — great match!</p>
                )}
              </div>
            </div>
          </div>

          {/* Your skills */}
          <div className="card">
            <p className="text-xs font-mono text-ink-400 uppercase tracking-widest mb-3">
              Your Resume Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {result.resume_skills.map((s) => (
                <SkillTag key={s} label={s} variant="volt" />
              ))}
            </div>
          </div>

          {/* Cover letter */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-mono text-ink-400 uppercase tracking-widest">
                Generated Cover Letter
              </p>
              <button
                onClick={copyCoverLetter}
                className="btn-secondary text-xs px-3 py-1.5"
              >
                {copied ? (
                  <>
                    <Check size={12} /> Copied!
                  </>
                ) : (
                  <>
                    <Copy size={12} /> Copy
                  </>
                )}
              </button>
            </div>
            {/* <div className="bg-surface-elevated rounded-lg p-5 border border-surface-border"> */}
            <div className="bg-surface-elevated rounded-lg p-3 sm:p-5 border border-surface-border">
              <p className="text-ink-200 text-sm font-body leading-relaxed whitespace-pre-wrap">
                {result.cover_letter}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
