import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
    // we init with resources
    resources: {
        en: {
            translations: {
                "courses": "Courses",
                "achievements": "Achievements",
                "diary": "Diary",
                "settings": "Settings",
                "profile": "Profile",
                "lessons": "Lessons",
                "lesson" : "Lesson",
                "viewed": "Viewed",
                "viewed_lessons": "Viewed lessons",
                "free_course": "Free course",
                "open": "Open",
                "save": "Save",
                "diary_of": "The {{name}}'s diary",
                "new_page": "New page",
                "images": "Images",
                "set_background_menu": "Set background image (menu)",
                "set_background_image": "Set background image",
                "last_achievement": "Last achievement",
                "last_game_completed" : "Último juego completado",
                "lesson_week" : "Lesson week",
                "no_achievement": "You haven't earned any achievement",
                "no_viewed_lesson": "You haven't seen any lessons yet",
                "this_week": "This week",
                "this_week_message": "you have seen {{total}} lessons this week",
                "view_achievements": "View achievements",
                "go_to_course": "Go to course",
                "viewed_lessons_week": "Viewed lessons in this week",
                "total": "Total",
                "monthly_advance": "Monthly advance",
                "logout":"Log out",
                "mark_all_as_viewed":"Mark all as viewed",
                "notifications" : "Notifications",
                "button_add_dashboard" : "Certificate",
                "user_name" : "User name",
                "email" : "Email",
                "birthdate" : "Birth date",
                "mobil_phone" : "Mobile Phone",
                "edit" : "Edit",
                "tody" : "Tody",
                "daily" : "Daily",
                "monthly_advance" : "Monthly Advance",
                "login" : "Login",
                "remember_me" : "Remember me",
                "privacy_policy" : "Privacy Policy",
                "footer_msg" : "Conquer your happiness",
                "register" : "Register",
                "check_in" : "Check In",
                "forgot_password" : "Forgot my password",
                "passwordRecovery" : "Recovery password",
                "send_email" : "Send email",
                "tutorial" : "Tutorial",
                "cancel" : "Cancel",
                "show_more" : "Show more",
                "available" : "Available",
                "search" : "Search",
                "password" : "Password",
                "enter" : "Login",
                "sloganDaily" : "Share your happiness",
                "add" : "Add"
            }
        },
        es: {
            translations: {
                "courses": "Cursos",
                "achievements": "Logros",
                "diary": "Diario",
                "settings": "Ajustes",
                "profile": "Perfil",
                "lessons": "Lecciones",
                "lesson" : "Lección",
                "viewed": "Visto",
                "viewed_lessons": "Lecciones vistas",
                "free_course": "Curso gratuito",
                "open": "Abrir",
                "save": "Guardar",
                "diary_of": "El diario de {{name}}",
                "new_page": "Nueva pagina",
                "images": "Imagenes",
                "set_background_menu": "Elegir imagen de fondo (menu)",
                "set_background_image": "Elegir imagen de fondo",
                "last_achievement": "Último logro",
                "last_game_completed" : "Último juego completado",
                "lesson_week" : "Lección de la semana",
                "no_achievement": "No has ganado ningun logro",
                "no_viewed_lesson": "No has visto ninguna lección",
                "this_week": "Esta semana",
                "this_week_message": "Has visto {{total}} lecciones esta semana",
                "view_achievements": "Ver logros",
                "go_to_course": "Ir al curso",
                "viewed_lessons_week": "Lecciones vistas en la semana",
                "total": "En total",
                "monthly_advance": "Avance mensual",
                "logout": "Cerrar sesion",
                "mark_all_as_viewed": "Marcar todos como vistos",
                "notifications" : "Notificaciones",
                "button_add_dashboard" : "Certificado",
                "user_name" : "Nombre de usuario",
                "email" : "Email",
                "birthdate" : "Fecha de nacimiento",
                "mobil_phone" : "Teléfono Movil",
                "edit" : "Editar",
                "tody" : "Hoy",
                "daily" : "Diario",
                "monthly_advance" : "Avance Mensual",
                "login" : "Iniciar sesión",
                "remember_me" : "Recordarme",
                "privacy_policy" : "Política de privacidad",
                "footer_msg" : "Conquista tu felicidad",
                "register" : "Registro",
                "check_in" : "Registrarse",
                "forgot_password" : "Olvide mi contraseña",
                "passwordRecovery" : "Recuperar contraseña",
                "send_email" : "Enviar email",
                "tutorial" : "Tutorial",
                "cancel" : "Cancelar",
                "show_more" : "Ver más",
                "available" : "Disponible",
                "search" : "Busqueda",
                "password" : "Contraseña",
                "enter" : "Ingresar",
                "sloganDaily" : "Comparte tu felicidad",
                "add" : "Agregar"

            }
        }
    },
    fallbackLng: "en",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ","
    },

    react: {
        wait: true
    }
});

export default i18n;
