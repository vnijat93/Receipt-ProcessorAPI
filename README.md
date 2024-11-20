# Receipt Processor API

## Getting Started

1. Clone this repository to your local machine:
    ```zsh
    git clone git@github.com:vnijat93/Receipt-ProcessorAPI.git
    cd your-repo-name
    ```

2. Build the Docker Image
    ```zsh
    docker build -t receipt-processor-api .
    ```

3. Run the Docker Container

    ```zsh
    docker run -p 3000:3000 receipt-processor-api
    ```

4. Stopping the Service:
    1. List the running containers to get the container ID:
        ```zsh
        docker ps
        ```
    2. Stop the container using its ID:
        ```zsh
        docker stop <container-id>
        ```
