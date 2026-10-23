export default function Field({
  as = 'input',
  id,
  label,
  error,
  hint,
  required = false,
  className = '',
  children,
  ...props
}) {
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null].filter(Boolean).join(' ');
  const controlClass = `input ${error ? 'input--error' : ''} ${className}`.trim();

  return (
    <div className={`field ${error ? 'field--error' : ''}`}>
      <label htmlFor={id}>
        {label}
        {required ? <span className="field__required" aria-hidden="true"> *</span> : null}
      </label>

      {as === 'textarea' ? (
        <textarea id={id} className={controlClass} aria-invalid={Boolean(error)} aria-describedby={describedBy || undefined} {...props} />
      ) : as === 'select' ? (
        <div className="select-wrap">
          <select id={id} className={controlClass} aria-invalid={Boolean(error)} aria-describedby={describedBy || undefined} {...props}>
            {children}
          </select>
        </div>
      ) : (
        <input id={id} className={controlClass} aria-invalid={Boolean(error)} aria-describedby={describedBy || undefined} {...props} />
      )}

      {hint ? (
        <p className="field__hint" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="field__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
