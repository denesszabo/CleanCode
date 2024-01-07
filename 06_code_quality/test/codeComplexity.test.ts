import { CodeComplexity } from '../src/codeComplexity'

describe('CodeComplexity tests', () => {
  let sut: CodeComplexity

  beforeEach(() => {
    sut = new CodeComplexity()
  })

  it('should return the correct result when a > b', () => {
    // Arrange
    const a = 5
    const b = 3

    // Act
    const result = sut.complexFunction(a, b)

    // Assert
    expect(result).toEqual(a + b)
  })

  it('should return the correct result when a <= b', () => {
    // Arrange
    const a = 3
    const b = 5

    // Act
    const result = sut.complexFunction(a, b)

    // Assert
    expect(result).toEqual(a + b)
  })

  it('should log appropriate messages', () => {
    // Arrange
    const consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => { })
    const a = 3
    const b = 5

    // Act
    sut.complexFunction(a, b)

    // Assert
    expect(consoleLogMock).toHaveBeenCalledWith('a is not greater than b')
    consoleLogMock.mockRestore() // Restore the original console.log
  })

  it('should log appropriate messages when a > b', () => {
    // Arrange
    const consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => { })
    const a = 5
    const b = 3

    // Act
    sut.complexFunction(a, b)

    // Assert
    expect(consoleLogMock).toHaveBeenCalledWith('a is greater than b')
    consoleLogMock.mockRestore() // Restore the original console.log
  })

  it('should log 5 iterations', () => {
    // Arrange
    const consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => { })
    const a = 3
    const b = 5

    // Act
    sut.complexFunction(a, b)

    // Assert
    expect(consoleLogMock).toHaveBeenCalledWith('Iteration 0')
    expect(consoleLogMock).toHaveBeenCalledWith('Iteration 1')
    expect(consoleLogMock).toHaveBeenCalledWith('Iteration 2')
    expect(consoleLogMock).toHaveBeenCalledWith('Iteration 3')
    expect(consoleLogMock).toHaveBeenCalledWith('Iteration 4')
    consoleLogMock.mockRestore()
  })
})
