export type Lang = "es" | "en";

export const LANGS: Lang[] = ["es", "en"];

/** Opção com valor canônico (independente de idioma) salvo no banco. */
export type Option = { value: string; es: string; en: string };

export const GENDER_OPTIONS: Option[] = [
  { value: "hombre", es: "Hombre", en: "Man" },
  { value: "mujer", es: "Mujer", en: "Woman" },
  { value: "otro", es: "Otro", en: "Other" },
  {
    value: "prefiero_no_responder",
    es: "Prefiero no responder",
    en: "Prefer not to say",
  },
];

export const ASPECT_OPTIONS: Option[] = [
  { value: "lugar_comodidad", es: "Lugar y comodidad", en: "Venue and comfort" },
  {
    value: "organizacion_torneos",
    es: "Organización de los torneos",
    en: "Tournament organization",
  },
  {
    value: "registro_logistica",
    es: "Registro y logística",
    en: "Registration and logistics",
  },
  {
    value: "ambiente_comunidad",
    es: "Ambiente y comunidad",
    en: "Atmosphere and community",
  },
  { value: "staff_atencion", es: "Staff y atención", en: "Staff and service" },
];

type Copy = {
  langName: string;
  intro: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  sections: {
    general: string;
    experience: string;
    nps: string;
    improvements: string;
    community: string;
  };
  q: {
    gender: string;
    birthDate: string;
    city: string;
    department: string;
    country: string;
    experienceRating: string;
    aspect: string;
    nps: string;
    improvements: string;
    community: string;
  };
  npsLow: string;
  npsHigh: string;
  optional: string;
  required: string;
  openPlaceholder: string;
  submit: string;
  submitting: string;
  validationError: string;
  submitError: string;
  thanksTitle: string;
  thanksText: string;
  thanksBack: string;
};

export const content: Record<Lang, Copy> = {
  es: {
    langName: "Español",
    intro: {
      eyebrow: "Encuesta · CCP Barranquilla",
      title: "Tu opinión es muy importante para el futuro del poker",
      paragraphs: [
        "A pesar de que el evento no pudo desarrollarse hasta el final, creemos que la experiencia, la opinión y la voz de cada jugador siguen siendo fundamentales para construir el futuro del poker deportivo en Colombia.",
        "Esta encuesta fue creada para entender cómo viviste esta etapa, qué podemos mejorar y cómo seguir fortaleciendo nuestra comunidad.",
      ],
    },
    sections: {
      general: "Datos generales",
      experience: "Experiencia general",
      nps: "Recomendación",
      improvements: "Mejoras",
      community: "Comunidad",
    },
    q: {
      gender: "Género",
      birthDate: "Fecha de nacimiento",
      city: "Ciudad",
      department: "Departamento",
      country: "País",
      experienceRating:
        "¿Cómo calificarías tu experiencia general en el CCP Barranquilla?",
      aspect: "¿Qué aspecto valoras más del evento?",
      nps: "En una escala del 1 al 10, ¿qué tan probable es que recomiendes el CCP a un amigo o colega deportista?",
      improvements: "¿Qué mejorarías para las próximas etapas?",
      community: "¿Qué representa hoy el poker para ti?",
    },
    npsLow: "Nada probable",
    npsHigh: "Muy probable",
    optional: "Opcional",
    required: "Obligatorio",
    openPlaceholder: "Escribe aquí tu respuesta…",
    submit: "Enviar respuestas",
    submitting: "Enviando…",
    validationError: "Por favor responde las preguntas obligatorias.",
    submitError: "Ocurrió un error al enviar. Inténtalo de nuevo.",
    thanksTitle: "¡Gracias por tu opinión!",
    thanksText:
      "Tu voz nos ayuda a construir el futuro del poker deportivo en Colombia.",
    thanksBack: "Enviar otra respuesta",
  },
  en: {
    langName: "English",
    intro: {
      eyebrow: "Survey · CCP Barranquilla",
      title: "Your opinion is very important for the future of poker",
      paragraphs: [
        "Even though the event could not run all the way to the end, we believe that the experience, the opinion and the voice of every player remain essential to building the future of competitive poker in Colombia.",
        "This survey was created to understand how you experienced this stage, what we can improve and how to keep strengthening our community.",
      ],
    },
    sections: {
      general: "General information",
      experience: "Overall experience",
      nps: "Recommendation",
      improvements: "Improvements",
      community: "Community",
    },
    q: {
      gender: "Gender",
      birthDate: "Date of birth",
      city: "City",
      department: "Department",
      country: "Country",
      experienceRating:
        "How would you rate your overall experience at CCP Barranquilla?",
      aspect: "Which aspect of the event do you value most?",
      nps: "On a scale from 1 to 10, how likely are you to recommend the CCP to a friend or fellow player?",
      improvements: "What would you improve for the next stages?",
      community: "What does poker mean to you today?",
    },
    npsLow: "Not at all likely",
    npsHigh: "Extremely likely",
    optional: "Optional",
    required: "Required",
    openPlaceholder: "Write your answer here…",
    submit: "Submit answers",
    submitting: "Submitting…",
    validationError: "Please answer the required questions.",
    submitError: "Something went wrong while submitting. Please try again.",
    thanksTitle: "Thank you for your feedback!",
    thanksText:
      "Your voice helps us build the future of competitive poker in Colombia.",
    thanksBack: "Submit another response",
  },
};
