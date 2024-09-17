export const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-animate');
        } else {
            entry.target.classList.remove('show-animate');
        }
    });
});

export const reverseObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('show-animate-bot');
            entry.target.classList.add('hidden-animate-bottom');
        }else{
            entry.target.classList.add('show-animate-bot');
            entry.target.classList.remove('hidden-animate-bottom');
        }
    });
});

export const Observer1 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-animate-bot');
            entry.target.classList.remove('hidden-animate-bottom');
        }else{
            entry.target.classList.remove('show-animate-bot');
            entry.target.classList.add('hidden-animate-bottom');
        }
    });
});

export const reverseObserver1 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('show-animate-bot');
            entry.target.classList.add('hidden-animate-bot');
        }else{
            entry.target.classList.add('show-animate-bot');
            entry.target.classList.remove('hidden-animate-bot');
        }
    });
});

export const Observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-animate-bot');
            entry.target.classList.remove('hidden-animate-bot');
        }else{
            entry.target.classList.remove('show-animate-bot');
            entry.target.classList.add('hidden-animate-bot');
        }
    });
});