## S3 Uploader
purpose of this tool for back up file in your server to s3

## How to use
1. Create new bucket in s3
2. Install `aws_access_key_id` and `aws_secret_access_key` to `~/.aws/credentials`
```
[s3backup]
aws_access_key_id = AAAAAAAA
aws_secret_access_key = XXXXXXXXXXXXXXXXXXXXXXXXXXX
```
3. Enter to this project directory and `npm install`
4. update `.env`
```
AWS_CREDENTIALS_PROFILE=profile_name_in_aws_credentials_file
AWS_BUCKET_NAME=your_bucket_name
```
5. Store all you files in `/files`
6. Run `node uploader`