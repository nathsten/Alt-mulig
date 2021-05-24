module Main where

mult :: Num a => a -> a
mult n = n * n 

isPos :: (Ord a, Num a) => a -> String   
isPos n = if n > 0 then "Greater than 0" else "Less than 0"  


sumIs10 a b = a + b == 10

factorial :: (Eq p, Num p) => p -> p
factorial n = if n == 1 then 1 else n * factorial (n - 1)

_gcd :: Integral t => t -> t -> t
_gcd a b = if b == 0 then a else _gcd b (a `rem` b)

main :: IO ()
main = 
    print (mult 22) >>
    print (isPos (-20)) >>
    print (sumIs10 0 0) >>
    print (factorial 5) >>
    print (_gcd 64000 3456)