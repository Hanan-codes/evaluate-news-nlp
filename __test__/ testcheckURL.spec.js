// Import the js file to test
import { checkUrl } from "../src/client/js/checkURL"

describe('Test check URL functionality', () => {
    test('Testing the checkURL function', () => {
        expect(checkUrl).toBeDefined()
    })
})
