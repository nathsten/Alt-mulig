inptField.innerHTML = `integral[2x+1,a,b] = |x^(2)+x+C|_a^b nl 
a_n=a_1*k^(n-1) nl 
sum[n=1,n<\infty] a_1*k^(n-1) = a_1 * (k^(n)-1)/k-1 nl 
sum[n=1,\infty] a_1*k^(n-1) = a_1/k-1 nl 
derived[2x^2+2x] = 4x +2 nl 
derivative[2x^2+2x,x]`;
MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'outptField']);
