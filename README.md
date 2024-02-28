# Node.js Async File Processing

This Node.js script reads a list of file paths from a configuration file, processes each file asynchronously, and displays the word count.

## Prerequisites

- Node.js installed on your machine

## Getting Started

1. Clone the repository
2. Install dependencies: ```npm install```
3. run the script: ``` node wordCountProcessor.js ```


## Configuration File Format
```
{
  "files": [
    "path/to/file1.txt",
    "path/to/file2.txt",
    "path/to/file3.txt"
  ]
}
```

## Sample of Results
```
files/file1.txt: 33 words
files/file2.txt: 0 word, empty file
files/file3.txt: 7 words
files/file4.txt: File does not exist
```

