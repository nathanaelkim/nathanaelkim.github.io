package io.github.nathanaelkim.quadratwurzelnbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RequestMapping("/api")
@SpringBootApplication
public class QuadratwurzelnBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(QuadratwurzelnBackendApplication.class, args);
    }

    private final List<Integer> squares = Arrays.asList(1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400, 441, 484, 529, 576, 625, 676, 729, 784, 841, 900, 961, 1024, 1089, 1156, 1225, 1296, 1369, 1444, 1521, 1600, 1681, 1764, 1849, 1936, 2025, 2116, 2209, 2304, 2401, 2500, 2601, 2704, 2809, 2916, 3025, 3136, 3249, 3364, 3481, 3600, 3721, 3844, 3969, 4096, 4225, 4356, 4489, 4624, 4761, 4900, 5041, 5184, 5329, 5476, 5625, 5776, 5929, 6084, 6241, 6400, 6561, 6724, 6889, 7056, 7225, 7396, 7569, 7744, 7921, 8100, 8281, 8464, 8649, 8836, 9025, 9216, 9409, 9604, 9801, 10000); // get squares until 10000

    // POST: get Input of result1
    @PostMapping("/result1")
    public <InputRequest> String calculateResult1(@RequestBody double input) {
        return calculateResult1WithQuery(input);
    }

    @GetMapping("/resultResponse1")
    public String calculateResult1WithQuery(double input) {
        Integer[] sqaresArray = squares.toArray(new Integer[0]); // convert the numbers of the list to arrays
        int closestIndex = -1;
        // search the number in the list
        for (int i = 0; i < sqaresArray.length; i++) {
            if (sqaresArray[i] == input) {
                closestIndex = i;
                break;
            }
        }
        if (closestIndex != -1) { // input is in the list
            if (closestIndex > 0) {
                double predecessor = Math.sqrt(sqaresArray[closestIndex - 1]); // predecessor number as square
                // approximation 1
                double approach2 = (double) input / (double) predecessor;
                double newApproach = (double) predecessor + (double) approach2 / 2;
                double solveApproach = (double) input / (double) newApproach;
                double currentApproach = newApproach;
                double tolerance = 1e-6; // tolerance
                int maxIterations = 1000; // max. Iterations
                int iterationCount = 0;
                while (Math.abs(currentApproach - solveApproach) > tolerance && iterationCount < maxIterations) {
                    currentApproach = (currentApproach + solveApproach) / 2;
                    solveApproach = input / currentApproach;
                    iterationCount++;
                }
                double sqrtResult = currentApproach;
                return "Die Wurzel aus" + input + "ist" + sqrtResult;
            }
            if (closestIndex < sqaresArray.length - 1) {
                double successor = Math.sqrt(sqaresArray[closestIndex + 1]); // successor number as square
            } else {
                return "Zahl zu hoch!";
            }
        } else {
            // input not in list
            int previous = -1, next = -1;
            for (int i = 0; i < sqaresArray.length; i++) {
                if (sqaresArray[i] < input) {
                    previous = sqaresArray[i];
                } else {
                    next = sqaresArray[i];
                    break;
                }
            }
            if (previous != -1) {
                double predecessor = Math.sqrt(previous); // define also the square of previous
                // approximation 1
                double approach = (double) input / (double) predecessor;
                double newApproach = (double) predecessor + (double) approach / 2;
                double solveApproach = (double) input / (double) newApproach;
                double currentApproach = newApproach;
                double tolerance = 1e-6; // tolerance
                int maxIterations = 1000; // max. Iterations
                int iterationCount = 0;
                while (Math.abs(currentApproach - solveApproach) > tolerance && iterationCount < maxIterations) {
                    currentApproach = (currentApproach + solveApproach) / 2;
                    solveApproach = input / currentApproach;
                    iterationCount++;
                }
                double sqrtResult = currentApproach;
                return "Die Wurzel aus" + input + "ist" + sqrtResult;
            }
            if (next != -1) {
                double successor = Math.sqrt(next); // define also the square of next
            } else {
                return "Zahl zu hoch!";
            }
        }
        return "Zahl zu niedrig!";
    }

    // POST: get Input of result2
    @PostMapping("/result2")
    public <InputRequest> String calculateResult2(@RequestBody double input) {
        return calculateResult2WithQuery(input);
    }

    @GetMapping("/resultResponse1")
    public String calculateResult2WithQuery(double input) {
        try {
            double ans = 0.5 * (input + 1); // get ANS with the equation 1/2*(x+1)
            double previousAns;

            do {
                previousAns = ans;
                ans = 0.5 * (ans + input / ans); // get equation 1/2(Ans+x/Ans)
            } while (Math.abs(ans - previousAns) > 1e-9); // return equation until the result not edited

            if (squares.contains((int) input)) {
                return "Die Wurzel aus " + input + " ist " + (int) ans;
            } else {
                return "Die Wurzel aus " + input + " ist ungefähr " + ans;
            }
        } catch (NumberFormatException e) {
            return "Bitte eine gültige Zahl eingeben!";
        }
    }
}