type MonitoringContext = {
  scope: string;
  details?: Record<string, unknown>;
};

export function reportError(error: unknown, context: MonitoringContext) {
  const payload = {
    scope: context.scope,
    details: context.details ?? {},
    error:
      error instanceof Error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : error,
  };

  console.error('[monitoring]', JSON.stringify(payload));
}

