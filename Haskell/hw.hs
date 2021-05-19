module Main where

mult :: Num a => a -> a
mult n = n * n 

isPos :: (Ord a, Num a) => a -> String   
isPos n = if n > 0 then "Greater than 0" else "Less than 0"  


sumIs10 a b = a + b == 10

main :: IO ()
main = 
    print (mult 22) >>
    print (isPos (-20)) >>
    print (sumIs10 0 0)